import { QROperations } from "@/components/link-hub/QROperations";
import type { Metadata } from "next";
import "./operations.css";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"QR Operations | Links Studio",robots:{index:false,follow:false}};
export default function OperationsPage(){return <QROperations/>}
