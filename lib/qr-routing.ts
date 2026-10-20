// Pure, deterministic routing policy, unit-tested independently of private storage.
export type QRRouteRecord={
 enabled:boolean;target:string;expiresAt?:string|null;
 schedule?:Array<{from:string;until:string;target:string}>;
 landing?:{enabled:boolean};
};
export function resolveQRRoute(item:QRRouteRecord,now=Date.now()){
 if(!item.enabled)return {kind:"paused" as const};
 if(item.expiresAt&&now>=Date.parse(item.expiresAt))return {kind:"expired" as const};
 const active=item.schedule?.find(w=>now>=Date.parse(w.from)&&now<Date.parse(w.until));
 const target=active?.target||item.target;
 if(item.landing?.enabled)return {kind:"landing" as const,target};
 return {kind:"redirect" as const,target};
}
