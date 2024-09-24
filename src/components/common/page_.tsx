import Chat from "@/components/Chat";
// import MatrixProvider from "@/components/MatrixProvider";

export default function Home() {
  return (
    // <MatrixProvider>
    <main>
      <header className="flex h-14 px-6 items-center">
        <h1 className="text-4xl font-serif font-semibold text-red-500">와</h1>
      </header>
      <Chat />
    </main>
    // </MatrixProvider>
  );
}
