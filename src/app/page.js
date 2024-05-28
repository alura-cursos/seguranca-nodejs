import Link from 'next/link';

export default function Home () {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Bem-vindo ao Nosso Site</h1>
      <div>
        <Link href="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
      </div>
      <div className="mt-4">
        <Link href="/register">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Registrar
          </button>
        </Link>
      </div>
    </div>
  );
}


