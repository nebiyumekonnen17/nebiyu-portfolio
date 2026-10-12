import type { Metadata } from "next";
import { QRDesigner } from "@/components/link-hub/QRDesigner";
import "../qr.css";
import "./designer.css";
import "../../studio.css";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Premium QR Designer | Links Studio",robots:{index:false,follow:false}};
export default async function DesignerPage({searchParams}:{searchParams:Promise<{slug?:string}>}){
 const {slug}=await searchParams;
 const valid=typeof slug==="string"&&/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/.test(slug);
 if(!valid)return <main style={{padding:40}}><h1>Select a QR code to customize.</h1><a href="/manage/qr">Return to QR Manager</a></main>;
 return <QRDesigner slug={slug}/>;
}
