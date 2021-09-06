import Container from 'react-bootstrap/Container';
import Link from 'components/Link/Link';

export default function QuoteSent() {
    return (
        <Container className='p-2 pt-5'>
            <h1 className='text-center py-5 my-5'>Merci pour votre commande! Votre soumission a été envoyée. Un courriel de confirmation vous a été envoyé.</h1>
            <Link href='/'><a className='text-center text-primary'><h1>Retour au catalogue</h1></a></Link>
        </Container>
    );
}