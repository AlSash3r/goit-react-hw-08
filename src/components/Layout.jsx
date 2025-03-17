import AppBar from "../components/AppBar/AppBar";
export default function Layout({ children }) {
  return (
    <div>
      <AppBar />
      {children}
    </div>
  );
}