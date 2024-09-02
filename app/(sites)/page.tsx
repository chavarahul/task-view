'use client'
import Sidebar from "../components/sidebar";
import MainComponent from "../components/dashboard-components/MainComponent";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState('dashboard');

  return (
    <main className="relative h-screen flex-bet">
       <Sidebar active={active} setActive={setActive}/>
       <section className="relative w-11/12 h-full px-5 py-6">
          {active === 'dashboard' && <MainComponent />}
       </section>
    </main>
  );
}
