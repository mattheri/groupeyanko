import { DatabaseCollection } from 'services/domain/User';
import { Firestore, FirestoreArrayFunctions } from 'services/domain/Database';
import Firebase from 'utils/Firebase';
import { Quote } from 'services/domain/Quote';
import QuoteAdapter from './QuoteAdapter';

class QuotesDatabaseClient {
  private static instance:QuotesDatabaseClient;
  private readonly firestore:Firestore;
  private readonly array:FirestoreArrayFunctions;
  private readonly quoteAdapter:typeof QuoteAdapter;

  private constructor(firestore:Firestore, array:FirestoreArrayFunctions, quoteAdapter:typeof QuoteAdapter) {
    this.firestore = firestore;
    this.array = array;
    this.quoteAdapter = quoteAdapter;
  }

  static getInstance():QuotesDatabaseClient {
    if (!QuotesDatabaseClient.instance) QuotesDatabaseClient.instance = new QuotesDatabaseClient(
      Firebase.firestore.db,
      Firebase.firestore.array,
      QuoteAdapter
    );

    return QuotesDatabaseClient.instance;
  }

  public async addQuoteToQuotes(quote:Omit<Quote, 'submittedOn'>, userId:string) {
    const quotes = await this.getQuotes(userId);
    const queryQuotes = this.quoteAdapter.clientQuotesToQueryQuotes(quote, userId);

    if (quotes.empty) return this.quotesTable.add(queryQuotes);
    
    const queryQuote = this.quoteAdapter.clientQuoteToQueryQuote(quote);

    quotes.docs.map(async (doc) => await doc.ref.update({
      quotes: this.array.push(queryQuote)
    }));

    return this.quoteAdapter.sortQuotes(quotes.docs);
  }

  public async getUserQuotes(userId:string) {
    const quotes = await this.getQuotes(userId);
    return this.quoteAdapter.sortQuotes(quotes.docs);
  }

  private async getQuotes(userId:string) {
    return this.quotesTable.where('id', '==', userId).get();
  }

  private get quotesTable() {
    return this.firestore.collection(DatabaseCollection.Quotes);
  }
}

export default QuotesDatabaseClient.getInstance();