import InfoBar from "./InfoBar";
import Navbar from "./Navbar";
import CategoryBar from "./CategoryBar";

export default function Header() {
  return (
    <header role="banner" className="sticky top-0 z-50">
      <InfoBar />
      <Navbar />
      <CategoryBar />
    </header>
  );
}
