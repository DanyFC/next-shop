import { montserrat } from "@/config/fonts";

export default function Home() {
  return (
    <div>
      <h1 className={`${montserrat.className} font-bold`}>Home</h1>
      <p>Welcome to your new Blitz app!</p>
    </div>
  );
}
