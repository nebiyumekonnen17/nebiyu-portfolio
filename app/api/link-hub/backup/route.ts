import { hasHubSession } from "@/lib/link-hub-auth";
import { readHub } from "@/lib/link-hub-store";
import { listManagedQR } from "@/lib/qr-manager";
import { readQRDesignDocument } from "@/lib/qr-design-store";
import { readBrandKits } from "@/lib/qr-brand-kits";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(){
 if(!(await hasHubSession()))return new Response("Unauthorized",{status:401,headers:{"Cache-Control":"no-store"}});
 try {
  const [draft,live,records,brands]=await Promise.all([readHub("draft"),readHub("live"),listManagedQR(),readBrandKits()]);
  const designs=await Promise.all(records.map(async row=>await readQRDesignDocument(row.slug)));
  const backup={schemaVersion:1,createdAt:new Date().toISOString(),source:"links.nebiyumekonnen.com",
   note:"Account credentials and login secrets are excluded. Restore requires a reviewed import process.",hub:{draft,live},qr:{records,designs,brands}};
  return new Response(JSON.stringify(backup,null,2),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store",
   "Content-Disposition":'attachment; filename="links-studio-backup.json"'}});
 }catch{return new Response("Could not generate backup",{status:503,headers:{"Cache-Control":"no-store"}})}
}
