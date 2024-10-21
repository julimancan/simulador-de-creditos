import Card from "./_components/Card"
import Form from "./_components/Form";



export default function Home() {

  return (
    <main className="grid place-content-center min-h-screen py-10">
      <Card>
        <header>
          <h1>Simulador de Crédito</h1>
          <p>Calcula tu crédito</p>
        </header>
        <Form />
      </Card>
    </main>
  );
}
