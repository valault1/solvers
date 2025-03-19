import Head from "next/head";
import styles from "../styles/Home.module.css";
import { DeckBuyerController } from "../frontend/DeckBuyerController";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function Home() {
  return (
    <div>
      <DeckBuyerController />
    </div>
  );
}
