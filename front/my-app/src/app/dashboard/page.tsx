"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Lines_Chart } from "@/app/dashboard/grafica";
import { Bar_Chart } from "@/app/dashboard/barras";
import {Circular_Chart} from "@/app/dashboard/pie"
import NeonBarChart from "@/app/dashboard/neon_bar"

const dashboard: React.FC = () => {
  return (
    <div>
      {/*logo intitech*/}
      <div>
        <Image
          src={"/icon.png"}
          alt={"icono intitech"}
          width={50}
          height={50}
        ></Image>
      </div>

      {/*barra de navegacion lateral*/}
      <nav>
        <h2>Dashboard</h2>
        <ul>
          {/*completar los href con las rutas relativas de cada link*/}
          <Link href={""}>
            <li>Orders</li>
          </Link>
          <Link href={""}>
            <li>Products</li>
          </Link>
          <Link href={""}>
            <li>Messages</li>
          </Link>
          <Link href={""}>
            <li>Settings</li>
          </Link>
          <Link href={""}>
            <li>Sing Out</li>
          </Link>
        </ul>
      </nav>

      {/*los graficos van a ser insertados como componentes dentro de las sections*/}
      <main  className="grid grid-cols-4 gap-1">
      <section>
        <div className="w-96 bg-gray-400">
          <Lines_Chart />
        </div>
      </section>

      <section>
        <div className="w-96">
          <Bar_Chart />
        </div>
      </section>

      <section>
        <div className="w-96">
          <Circular_Chart />
        </div>
      </section>
      <section>
        <div className="w-96">
          <NeonBarChart />
        </div>
      </section>
      </main>
    </div>
  );
};

export default dashboard;
