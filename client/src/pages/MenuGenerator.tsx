import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuGeneratorComponent from '@/components/MenuGenerator';

export default function MenuGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MenuGeneratorComponent />
      </main>
      <Footer />
    </div>
  );
}
