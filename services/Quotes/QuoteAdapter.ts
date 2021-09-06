import { Documents, QueryDocuments, ServerTimestamp } from "services/domain/Database";
import { Quote, Quotes } from "services/domain/Quote";
import Firebase from "utils/Firebase";

class QuoteAdapter {
  private static instance:QuoteAdapter;
  private readonly serverTimestamp:ServerTimestamp;
  private constructor(serverTimestamp:ServerTimestamp) {
    this.serverTimestamp = serverTimestamp;
  };

  static getInstance():QuoteAdapter {
    if (!QuoteAdapter.instance) QuoteAdapter.instance = new QuoteAdapter(Firebase.firestore.timestamp);

    return QuoteAdapter.instance;
  }

  public clientQuotesToQueryQuotes(quote:Omit<Quote, 'submittedOn'>, userId:string):Quotes {
    const queryQuote = {
      products: quote.products,
      submittedOn: this.serverTimestamp,
    };

    return {
      id: userId,
      quotes: [
        queryQuote
      ],
    }
  }

  public clientQuoteToQueryQuote(quote:Omit<Quote, 'submittedOn'>):Quote {
    return {
      products: quote.products,
      submittedOn: this.serverTimestamp,
    }
  }

  public sortQuotes(quotes:Documents):QueryDocuments {
    return quotes.map((doc) => doc.data()).sort((a, b) => a.submittedOn.valueOf() - b.submittedOn.valueOf());
  }
}

export default QuoteAdapter.getInstance();
