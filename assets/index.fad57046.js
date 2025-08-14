import{a as q,M as L,i as _t,T as Mt,b as Bt,g as St,c as Dt,B as G,I as Et,C as Ft,O as Nt,R as zt,S as kt,d as Ct}from"./MeshBVH.9a6f34e6.js";import{A as Ce,e as Re,j as Pe,E as He,h as Ve,N as Oe,l as We,f as Ue,k as qe}from"./MeshBVH.9a6f34e6.js";import{aL as Rt,aE as Pt,ag as Ht,f as P,aB as Vt,M as $,B as k,d as D,a as X,V as A,cx as Ot,S as Wt,z as Ut,bz as qt,A as Z,J as S,r as C,cO as U,O as R,m as et,cP as Lt,cQ as nt,cR as jt,H as j,cS as J,ac as Xt,G as Gt,cT as yt,cU as Yt,b as Kt,x as Q}from"./three@0.169.7.js";const it=new X,ot=new P;class Zt extends Vt{get isMesh(){return!this.displayEdges}get isLineSegments(){return this.displayEdges}get isLine(){return this.displayEdges}getVertexPosition(...t){return $.prototype.getVertexPosition.call(this,...t)}constructor(t,e,i=10,o=0){super(),this.material=e,this.geometry=new k,this.name="MeshBVHRootHelper",this.depth=i,this.displayParents=!1,this.bvh=t,this.displayEdges=!0,this._group=o}raycast(){}update(){const t=this.geometry,e=this.bvh,i=this._group;if(t.dispose(),this.visible=!1,e){const o=this.depth-1,s=this.displayParents;let a=0;e.traverse((h,f)=>{if(h>=o||f)return a++,!0;s&&a++},i);let c=0;const r=new Float32Array(8*3*a);e.traverse((h,f,p)=>{const m=h>=o||f;if(m||s){q(0,p,it);const{min:v,max:x}=it;for(let y=-1;y<=1;y+=2){const b=y<0?v.x:x.x;for(let E=-1;E<=1;E+=2){const I=E<0?v.y:x.y;for(let w=-1;w<=1;w+=2){const Tt=w<0?v.z:x.z;r[c+0]=b,r[c+1]=I,r[c+2]=Tt,c+=3}}}return m}},i);let u,l;this.displayEdges?l=new Uint8Array([0,4,1,5,2,6,3,7,0,2,1,3,4,6,5,7,0,1,2,3,4,5,6,7]):l=new Uint8Array([0,1,2,2,1,3,4,6,5,6,7,5,1,4,5,0,4,1,2,3,6,3,7,6,0,2,4,2,6,4,1,5,3,3,5,7]),r.length>65535?u=new Uint32Array(l.length*a):u=new Uint16Array(l.length*a);const d=l.length;for(let h=0;h<a;h++){const f=h*8,p=h*d;for(let m=0;m<d;m++)u[p+m]=f+l[m]}t.setIndex(new D(u,1,!1)),t.setAttribute("position",new D(r,3,!1)),this.visible=!0}}}class xt extends Rt{get color(){return this.edgeMaterial.color}get opacity(){return this.edgeMaterial.opacity}set opacity(t){this.edgeMaterial.opacity=t,this.meshMaterial.opacity=t}constructor(t=null,e=null,i=10){t instanceof L&&(i=e||10,e=t,t=null),typeof e=="number"&&(i=e,e=null),super(),this.name="MeshBVHHelper",this.depth=i,this.mesh=t,this.bvh=e,this.displayParents=!1,this.displayEdges=!0,this.objectIndex=0,this._roots=[];const o=new Pt({color:65416,transparent:!0,opacity:.3,depthWrite:!1}),s=new Ht({color:65416,transparent:!0,opacity:.3,depthWrite:!1});s.color=o.color,this.edgeMaterial=o,this.meshMaterial=s,this.update()}update(){const t=this.mesh;let e=this.bvh||t.geometry.boundsTree||null;if(t.isBatchedMesh&&t.boundsTrees&&!e){const o=t._drawInfo[this.objectIndex];o&&(e=t.boundsTrees[o.geometryIndex]||e)}const i=e?e._roots.length:0;for(;this._roots.length>i;){const o=this._roots.pop();o.geometry.dispose(),this.remove(o)}for(let o=0;o<i;o++){const{depth:s,edgeMaterial:a,meshMaterial:c,displayParents:r,displayEdges:u}=this;if(o>=this._roots.length){const d=new Zt(e,a,s,o);this.add(d),this._roots.push(d)}const l=this._roots[o];l.bvh=e,l.depth=s,l.displayParents=r,l.displayEdges=u,l.material=u?a:c,l.update()}}updateMatrixWorld(...t){const e=this.mesh,i=this.parent;e!==null&&(e.updateWorldMatrix(!0,!1),i?this.matrix.copy(i.matrixWorld).invert().multiply(e.matrixWorld):this.matrix.copy(e.matrixWorld),(e.isInstancedMesh||e.isBatchedMesh)&&(e.getMatrixAt(this.objectIndex,ot),this.matrix.multiply(ot)),this.matrix.decompose(this.position,this.quaternion,this.scale)),super.updateMatrixWorld(...t)}copy(t){this.depth=t.depth,this.mesh=t.mesh,this.bvh=t.bvh,this.opacity=t.opacity,this.color.copy(t.color)}clone(){return new xt(this.mesh,this.bvh,this.depth)}dispose(){this.edgeMaterial.dispose(),this.meshMaterial.dispose();const t=this.children;for(let e=0,i=t.length;e<i;e++)t[e].geometry.dispose()}}const F=new X,st=new X,B=new A;function rt(n){switch(typeof n){case"number":return 8;case"string":return n.length*2;case"boolean":return 4;default:return 0}}function Jt(n){return/(Uint|Int|Float)(8|16|32)Array/.test(n.constructor.name)}function $t(n,t){const e={nodeCount:0,leafNodeCount:0,depth:{min:1/0,max:-1/0},tris:{min:1/0,max:-1/0},splits:[0,0,0],surfaceAreaScore:0};return n.traverse((i,o,s,a,c)=>{const r=s[3]-s[0],u=s[1+3]-s[1],l=s[2+3]-s[2],d=2*(r*u+u*l+l*r);e.nodeCount++,o?(e.leafNodeCount++,e.depth.min=Math.min(i,e.depth.min),e.depth.max=Math.max(i,e.depth.max),e.tris.min=Math.min(c,e.tris.min),e.tris.max=Math.max(c,e.tris.max),e.surfaceAreaScore+=d*Mt*c):(e.splits[a]++,e.surfaceAreaScore+=d*Bt)},t),e.tris.min===1/0&&(e.tris.min=0,e.tris.max=0),e.depth.min===1/0&&(e.depth.min=0,e.depth.max=0),e}function ye(n){return n._roots.map((t,e)=>$t(n,e))}function xe(n){const t=new Set,e=[n];let i=0;for(;e.length;){const o=e.pop();if(!t.has(o)){t.add(o);for(let s in o){if(!Object.hasOwn(o,s))continue;i+=rt(s);const a=o[s];a&&(typeof a=="object"||typeof a=="function")?Jt(a)||_t()&&a instanceof SharedArrayBuffer||a instanceof ArrayBuffer?i+=a.byteLength:e.push(a):i+=rt(a)}}}return i}function ve(n){const t=n.geometry,e=[],i=t.index,o=t.getAttribute("position");let s=!0;return n.traverse((a,c,r,u,l)=>{const d={depth:a,isLeaf:c,boundingData:r,offset:u,count:l};e[a]=d,q(0,r,F);const h=e[a-1];if(c)for(let f=u,p=u+l;f<p;f++){const m=n.resolveTriangleIndex(f);let v=3*m,x=3*m+1,y=3*m+2;i&&(v=i.getX(v),x=i.getX(x),y=i.getX(y));let b;B.fromBufferAttribute(o,v),b=F.containsPoint(B),B.fromBufferAttribute(o,x),b=b&&F.containsPoint(B),B.fromBufferAttribute(o,y),b=b&&F.containsPoint(B),console.assert(b,"Leaf bounds does not fully contain triangle."),s=s&&b}if(h){q(0,r,st);const f=st.containsBox(F);console.assert(f,"Parent bounds does not fully contain child."),s=s&&f}}),s}function ge(n){const t=[];return n.traverse((e,i,o,s,a)=>{const c={bounds:q(0,o,new X)};i?(c.count=a,c.offset=s):(c.left=null,c.right=null),t[e]=c;const r=t[e-1];r&&(r.left===null?r.left=c:r.right=c)}),t[0]}function at(n,t,e){return n===null?null:(n.point.applyMatrix4(t.matrixWorld),n.distance=n.point.distanceTo(e.ray.origin),n.object=t,n)}const Qt=parseInt(Ut)>=166,H=new qt,ct=new A,lt=new P,te=$.prototype.raycast,ee=Ot.prototype.raycast,dt=new A,g=new $,V=[];function Ie(n,t){this.isBatchedMesh?ne.call(this,n,t):ie.call(this,n,t)}function ne(n,t){if(this.boundsTrees){const e=this.boundsTrees,i=this._drawInfo||this._instanceInfo,o=this._drawRanges||this._geometryInfo,s=this.matrixWorld;g.material=this.material,g.geometry=this.geometry;const a=g.geometry.boundsTree,c=g.geometry.drawRange;g.geometry.boundingSphere===null&&(g.geometry.boundingSphere=new Wt);for(let r=0,u=i.length;r<u;r++){if(!this.getVisibleAt(r))continue;const l=i[r].geometryIndex;if(g.geometry.boundsTree=e[l],this.getMatrixAt(r,g.matrixWorld).premultiply(s),!g.geometry.boundsTree){this.getBoundingBoxAt(l,g.geometry.boundingBox),this.getBoundingSphereAt(l,g.geometry.boundingSphere);const d=o[l];g.geometry.setDrawRange(d.start,d.count)}g.raycast(n,V);for(let d=0,h=V.length;d<h;d++){const f=V[d];f.object=this,f.batchId=r,t.push(f)}V.length=0}g.geometry.boundsTree=a,g.geometry.drawRange=c,g.material=null,g.geometry=null}else ee.call(this,n,t)}function ie(n,t){if(this.geometry.boundsTree){if(this.material===void 0)return;lt.copy(this.matrixWorld).invert(),H.copy(n.ray).applyMatrix4(lt),dt.setFromMatrixScale(this.matrixWorld),ct.copy(H.direction).multiply(dt);const e=ct.length(),i=n.near/e,o=n.far/e,s=this.geometry.boundsTree;if(n.firstHitOnly===!0){const a=at(s.raycastFirst(H,this.material,i,o),this,n);a&&t.push(a)}else{const a=s.raycast(H,this.material,i,o);for(let c=0,r=a.length;c<r;c++){const u=at(a[c],this,n);u&&t.push(u)}}}else te.call(this,n,t)}function we(n={}){return this.boundsTree=new L(this,n),this.boundsTree}function Ae(){this.boundsTree=null}function Te(n=-1,t={}){if(!Qt)throw new Error("BatchedMesh: Three r166+ is required to compute bounds trees.");t.indirect&&console.warn('"Indirect" is set to false because it is not supported for BatchedMesh.'),t={...t,indirect:!1,range:null};const e=this._drawRanges||this._geometryInfo,i=this._geometryCount;this.boundsTrees||(this.boundsTrees=new Array(i).fill(null));const o=this.boundsTrees;for(;o.length<i;)o.push(null);if(n<0){for(let s=0;s<i;s++)t.range=e[s],o[s]=new L(this.geometry,t);return o}else return n<e.length&&(t.range=e[n],o[n]=new L(this.geometry,t)),o[n]||null}function _e(n=-1){n<0?this.boundsTrees.fill(null):n<this.boundsTree.length&&(this.boundsTrees[n]=null)}function oe(n){switch(n){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function se(n){switch(n){case 1:return Gt;case 2:return Xt;case 3:return j;case 4:return j}}function ut(n){switch(n){case 1:return Yt;case 2:return yt;case 3:return J;case 4:return J}}class tt extends Z{constructor(){super(),this.minFilter=S,this.magFilter=S,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(t){const e=this.overrideItemSize,i=t.itemSize,o=t.count;if(e!==null){if(i*o%e!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");t.itemSize=e,t.count=o*i/e}const s=t.itemSize,a=t.count,c=t.normalized,r=t.array.constructor,u=r.BYTES_PER_ELEMENT;let l=this._forcedType,d=s;if(l===null)switch(r){case Float32Array:l=R;break;case Uint8Array:case Uint16Array:case Uint32Array:l=C;break;case Int8Array:case Int16Array:case Int32Array:l=U;break}let h,f,p,m,v=oe(s);switch(l){case R:p=1,f=se(s),c&&u===1?(m=r,v+="8",r===Uint8Array?h=et:(h=nt,v+="_SNORM")):(m=Float32Array,v+="32F",h=R);break;case U:v+=u*8+"I",p=c?Math.pow(2,r.BYTES_PER_ELEMENT*8-1):1,f=ut(s),u===1?(m=Int8Array,h=nt):u===2?(m=Int16Array,h=jt):(m=Int32Array,h=U);break;case C:v+=u*8+"UI",p=c?Math.pow(2,r.BYTES_PER_ELEMENT*8-1):1,f=ut(s),u===1?(m=Uint8Array,h=et):u===2?(m=Uint16Array,h=Lt):(m=Uint32Array,h=C);break}d===3&&(f===j||f===J)&&(d=4);const x=Math.ceil(Math.sqrt(a))||1,y=d*x*x,b=new m(y),E=t.normalized;t.normalized=!1;for(let I=0;I<a;I++){const w=d*I;b[w]=t.getX(I)/p,s>=2&&(b[w+1]=t.getY(I)/p),s>=3&&(b[w+2]=t.getZ(I)/p,d===4&&(b[w+3]=1)),s>=4&&(b[w+3]=t.getW(I)/p)}t.normalized=E,this.internalFormat=v,this.format=f,this.type=h,this.image.width=x,this.image.height=x,this.image.data=b,this.needsUpdate=!0,this.dispose(),t.itemSize=i,t.count=o}}class re extends tt{constructor(){super(),this._forcedType=C}}class Me extends tt{constructor(){super(),this._forcedType=U}}class ae extends tt{constructor(){super(),this._forcedType=R}}class Be{constructor(){this.index=new re,this.position=new ae,this.bvhBounds=new Z,this.bvhContents=new Z,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(t){const{geometry:e}=t;if(le(t,this.bvhBounds,this.bvhContents),this.position.updateFrom(e.attributes.position),t.indirect){const i=t._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==i.length)if(e.index)this._cachedIndexAttr=e.index.clone();else{const o=St(Dt(e));this._cachedIndexAttr=new D(o,1,!1)}ce(e,i,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(e.index)}dispose(){const{index:t,position:e,bvhBounds:i,bvhContents:o}=this;t&&t.dispose(),e&&e.dispose(),i&&i.dispose(),o&&o.dispose()}}function ce(n,t,e){const i=e.array,o=n.index?n.index.array:null;for(let s=0,a=t.length;s<a;s++){const c=3*s,r=3*t[s];for(let u=0;u<3;u++)i[c+u]=o?o[r+u]:r+u}}function le(n,t,e){const i=n._roots;if(i.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");const o=i[0],s=new Uint16Array(o),a=new Uint32Array(o),c=new Float32Array(o),r=o.byteLength/G,u=2*Math.ceil(Math.sqrt(r/2)),l=new Float32Array(4*u*u),d=Math.ceil(Math.sqrt(r)),h=new Uint32Array(2*d*d);for(let f=0;f<r;f++){const p=f*G/4,m=p*2,v=Ct(p);for(let x=0;x<3;x++)l[8*f+0+x]=c[v+0+x],l[8*f+4+x]=c[v+3+x];if(Et(m,s)){const x=Ft(m,s),y=Nt(p,a),b=4294901760|x;h[f*2+0]=b,h[f*2+1]=y}else{const x=4*zt(p,a)/G,y=kt(p,a);h[f*2+0]=y,h[f*2+1]=x}}t.image.data=l,t.image.width=u,t.image.height=u,t.format=j,t.type=R,t.internalFormat="RGBA32F",t.minFilter=S,t.magFilter=S,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose(),e.image.data=h,e.image.width=d,e.image.height=d,e.format=yt,e.type=C,e.internalFormat="RG32UI",e.minFilter=S,e.magFilter=S,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose()}const T=new A,_=new A,M=new A,ft=new Q,O=new A,Y=new A,ht=new Q,pt=new Q,W=new P,mt=new P;function N(n,t){if(!n&&!t)return;const e=n.count===t.count,i=n.normalized===t.normalized,o=n.array.constructor===t.array.constructor,s=n.itemSize===t.itemSize;if(!e||!i||!o||!s)throw new Error}function z(n,t=null){const e=n.array.constructor,i=n.normalized,o=n.itemSize,s=t===null?n.count:t;return new D(new e(o*s),o,i)}function vt(n,t,e=0){if(n.isInterleavedBufferAttribute){const i=n.itemSize;for(let o=0,s=n.count;o<s;o++){const a=o+e;t.setX(a,n.getX(o)),i>=2&&t.setY(a,n.getY(o)),i>=3&&t.setZ(a,n.getZ(o)),i>=4&&t.setW(a,n.getW(o))}}else{const i=t.array,o=i.constructor,s=i.BYTES_PER_ELEMENT*n.itemSize*e;new o(i.buffer,s,n.array.length).set(n.array)}}function de(n,t,e){const i=n.elements,o=t.elements;for(let s=0,a=o.length;s<a;s++)i[s]+=o[s]*e}function bt(n,t,e){const i=n.skeleton,o=n.geometry,s=i.bones,a=i.boneInverses;ht.fromBufferAttribute(o.attributes.skinIndex,t),pt.fromBufferAttribute(o.attributes.skinWeight,t),W.elements.fill(0);for(let c=0;c<4;c++){const r=pt.getComponent(c);if(r!==0){const u=ht.getComponent(c);mt.multiplyMatrices(s[u].matrixWorld,a[u]),de(W,mt,r)}}return W.multiply(n.bindMatrix).premultiply(n.bindMatrixInverse),e.transformDirection(W),e}function K(n,t,e,i,o){O.set(0,0,0);for(let s=0,a=n.length;s<a;s++){const c=t[s],r=n[s];c!==0&&(Y.fromBufferAttribute(r,i),e?O.addScaledVector(Y,c):O.addScaledVector(Y.sub(o),c))}o.add(O)}function ue(n,t={useGroups:!1,updateIndex:!1,skipAttributes:[]},e=new k){const i=n[0].index!==null,{useGroups:o=!1,updateIndex:s=!1,skipAttributes:a=[]}=t,c=new Set(Object.keys(n[0].attributes)),r={};let u=0;e.clearGroups();for(let l=0;l<n.length;++l){const d=n[l];let h=0;if(i!==(d.index!==null))throw new Error("StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");for(const f in d.attributes){if(!c.has(f))throw new Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.');r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),h++}if(h!==c.size)throw new Error("StaticGeometryGenerator: Make sure all geometries have the same number of attributes.");if(o){let f;if(i)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else throw new Error("StaticGeometryGenerator: The geometry must have either an index or a position attribute");e.addGroup(u,f,l),u+=f}}if(i){let l=!1;if(!e.index){let d=0;for(let h=0;h<n.length;++h)d+=n[h].index.count;e.setIndex(new D(new Uint32Array(d),1,!1)),l=!0}if(s||l){const d=e.index;let h=0,f=0;for(let p=0;p<n.length;++p){const m=n[p],v=m.index;if(a[p]!==!0)for(let x=0;x<v.count;++x)d.setX(h,v.getX(x)+f),h++;f+=m.attributes.position.count}}}for(const l in r){const d=r[l];if(!(l in e.attributes)){let p=0;for(const m in d)p+=d[m].count;e.setAttribute(l,z(r[l][0],p))}const h=e.attributes[l];let f=0;for(let p=0,m=d.length;p<m;p++){const v=d[p];a[p]!==!0&&vt(v,h,f),f+=v.count}}return e}function fe(n,t){if(n===null||t===null)return n===t;if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function he(n){const{index:t,attributes:e}=n;if(t)for(let i=0,o=t.count;i<o;i+=3){const s=t.getX(i),a=t.getX(i+2);t.setX(i,a),t.setX(i+2,s)}else for(const i in e){const o=e[i],s=o.itemSize;for(let a=0,c=o.count;a<c;a+=3)for(let r=0;r<s;r++){const u=o.getComponent(a,r),l=o.getComponent(a+2,r);o.setComponent(a,r,l),o.setComponent(a+2,r,u)}}return n}class pe{constructor(t){this.matrixWorld=new P,this.geometryHash=null,this.boneMatrices=null,this.primitiveCount=-1,this.mesh=t,this.update()}update(){const t=this.mesh,e=t.geometry,i=t.skeleton,o=(e.index?e.index.count:e.attributes.position.count)/3;if(this.matrixWorld.copy(t.matrixWorld),this.geometryHash=e.attributes.position.version,this.primitiveCount=o,i){i.boneTexture||i.computeBoneTexture(),i.update();const s=i.boneMatrices;!this.boneMatrices||this.boneMatrices.length!==s.length?this.boneMatrices=s.slice():this.boneMatrices.set(s)}else this.boneMatrices=null}didChange(){const t=this.mesh,e=t.geometry,i=(e.index?e.index.count:e.attributes.position.count)/3;return!(this.matrixWorld.equals(t.matrixWorld)&&this.geometryHash===e.attributes.position.version&&fe(t.skeleton&&t.skeleton.boneMatrices||null,this.boneMatrices)&&this.primitiveCount===i)}}class Se{constructor(t){Array.isArray(t)||(t=[t]);const e=[];t.forEach(i=>{i.traverseVisible(o=>{o.isMesh&&e.push(o)})}),this.meshes=e,this.useGroups=!0,this.applyWorldTransforms=!0,this.attributes=["position","normal","color","tangent","uv","uv2"],this._intermediateGeometry=new Array(e.length).fill().map(()=>new k),this._diffMap=new WeakMap}getMaterials(){const t=[];return this.meshes.forEach(e=>{Array.isArray(e.material)?t.push(...e.material):t.push(e.material)}),t}generate(t=new k){let e=[];const{meshes:i,useGroups:o,_intermediateGeometry:s,_diffMap:a}=this;for(let c=0,r=i.length;c<r;c++){const u=i[c],l=s[c],d=a.get(u);!d||d.didChange(u)?(this._convertToStaticGeometry(u,l),e.push(!1),d?d.update():a.set(u,new pe(u))):e.push(!0)}if(s.length===0){t.setIndex(null);const c=t.attributes;for(const r in c)t.deleteAttribute(r);for(const r in this.attributes)t.setAttribute(this.attributes[r],new D(new Float32Array(0),4,!1))}else ue(s,{useGroups:o,skipAttributes:e},t);for(const c in t.attributes)t.attributes[c].needsUpdate=!0;return t}_convertToStaticGeometry(t,e=new k){const i=t.geometry,o=this.applyWorldTransforms,s=this.attributes.includes("normal"),a=this.attributes.includes("tangent"),c=i.attributes,r=e.attributes;!e.index&&i.index&&(e.index=i.index.clone()),r.position||e.setAttribute("position",z(c.position)),s&&!r.normal&&c.normal&&e.setAttribute("normal",z(c.normal)),a&&!r.tangent&&c.tangent&&e.setAttribute("tangent",z(c.tangent)),N(i.index,e.index),N(c.position,r.position),s&&N(c.normal,r.normal),a&&N(c.tangent,r.tangent);const u=c.position,l=s?c.normal:null,d=a?c.tangent:null,h=i.morphAttributes.position,f=i.morphAttributes.normal,p=i.morphAttributes.tangent,m=i.morphTargetsRelative,v=t.morphTargetInfluences,x=new Kt;x.getNormalMatrix(t.matrixWorld),i.index&&e.index.array.set(i.index.array);for(let y=0,b=c.position.count;y<b;y++)T.fromBufferAttribute(u,y),l&&_.fromBufferAttribute(l,y),d&&(ft.fromBufferAttribute(d,y),M.fromBufferAttribute(d,y)),v&&(h&&K(h,v,m,y,T),f&&K(f,v,m,y,_),p&&K(p,v,m,y,M)),t.isSkinnedMesh&&(t.applyBoneTransform(y,T),l&&bt(t,y,_),d&&bt(t,y,M)),o&&T.applyMatrix4(t.matrixWorld),r.position.setXYZ(y,T.x,T.y,T.z),l&&(o&&_.applyNormalMatrix(x),r.normal.setXYZ(y,_.x,_.y,_.z)),d&&(o&&M.transformDirection(t.matrixWorld),r.tangent.setXYZW(y,M.x,M.y,M.z,ft.w));for(const y in this.attributes){const b=this.attributes[y];b==="position"||b==="tangent"||b==="normal"||!(b in c)||(r[b]||e.setAttribute(b,z(c[b])),N(c[b],r[b]),vt(c[b],r[b]))}return t.matrixWorld.determinant()<0&&he(e),e}}const gt=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`,It=`

float dot2( vec3 v ) {

	return dot( v, v );

}

// https://www.shadertoy.com/view/ttfGWl
vec3 closestPointToTriangle( vec3 p, vec3 v0, vec3 v1, vec3 v2, out vec3 barycoord ) {

    vec3 v10 = v1 - v0;
    vec3 v21 = v2 - v1;
    vec3 v02 = v0 - v2;

	vec3 p0 = p - v0;
	vec3 p1 = p - v1;
	vec3 p2 = p - v2;

    vec3 nor = cross( v10, v02 );

    // method 2, in barycentric space
    vec3  q = cross( nor, p0 );
    float d = 1.0 / dot2( nor );
    float u = d * dot( q, v02 );
    float v = d * dot( q, v10 );
    float w = 1.0 - u - v;

	if( u < 0.0 ) {

		w = clamp( dot( p2, v02 ) / dot2( v02 ), 0.0, 1.0 );
		u = 0.0;
		v = 1.0 - w;

	} else if( v < 0.0 ) {

		u = clamp( dot( p0, v10 ) / dot2( v10 ), 0.0, 1.0 );
		v = 0.0;
		w = 1.0 - u;

	} else if( w < 0.0 ) {

		v = clamp( dot( p1, v21 ) / dot2( v21 ), 0.0, 1.0 );
		w = 0.0;
		u = 1.0-v;

	}

	barycoord = vec3( u, v, w );
    return u * v1 + v * v2 + w * v0;

}

float distanceToTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// point and cut off range
	vec3 point, float closestDistanceSquared,

	// outputs
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord, inout float side, inout vec3 outPoint
) {

	bool found = false;
	vec3 localBarycoord;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		// get the closest point and barycoord
		vec3 closestPoint = closestPointToTriangle( point, a, b, c, localBarycoord );
		vec3 delta = point - closestPoint;
		float sqDist = dot2( delta );
		if ( sqDist < closestDistanceSquared ) {

			// set the output results
			closestDistanceSquared = sqDist;
			faceIndices = uvec4( indices.xyz, i );
			faceNormal = normalize( cross( a - b, b - c ) );
			barycoord = localBarycoord;
			outPoint = closestPoint;
			side = sign( dot( faceNormal, delta ) );

		}

	}

	return closestDistanceSquared;

}

float distanceSqToBounds( vec3 point, vec3 boundsMin, vec3 boundsMax ) {

	vec3 clampedPoint = clamp( point, boundsMin, boundsMax );
	vec3 delta = point - clampedPoint;
	return dot( delta, delta );

}

float distanceSqToBVHNodeBoundsPoint( vec3 point, sampler2D bvhBounds, uint currNodeIndex ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return distanceSqToBounds( point, boundsMin, boundsMax );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhClosestPointToPoint(		bvh,		point, maxDistance, faceIndices, faceNormal, barycoord, side, outPoint	)	_bvhClosestPointToPoint(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		point, maxDistance, faceIndices, faceNormal, barycoord, side, outPoint	)

float _bvhClosestPointToPoint(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// point to check
	vec3 point, float maxDistance,

	// output variables
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout vec3 outPoint
 ) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float closestDistanceSquared = maxDistance * maxDistance;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, currNodeIndex );
		if ( boundsHitDistance > closestDistanceSquared ) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );
		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;
			closestDistanceSquared = distanceToTriangles(
				bvh_position, bvh_index, offset, count, point, closestDistanceSquared,

				// outputs
				faceIndices, faceNormal, barycoord, side, outPoint
			);

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;
			bool leftToRight = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, leftIndex ) < distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, rightIndex );//rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;
			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return sqrt( closestDistanceSquared );

}
`,wt=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`,At=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,De=Object.freeze(Object.defineProperty({__proto__:null,bvh_distance_functions:It,bvh_ray_functions:wt,bvh_struct_definitions:At,common_functions:gt},Symbol.toStringTag,{value:"Module"})),Ee=At,Fe=It,Ne=`
	${gt}
	${wt}
`;export{Ce as AVERAGE,De as BVHShaderGLSL,Re as CENTER,Pe as CONTAINED,He as ExtendedTriangle,ae as FloatVertexAttributeTexture,Ve as INTERSECTED,Me as IntVertexAttributeTexture,L as MeshBVH,xt as MeshBVHHelper,Be as MeshBVHUniformStruct,Oe as NOT_INTERSECTED,We as OrientedBox,Ue as SAH,Se as StaticGeometryGenerator,re as UIntVertexAttributeTexture,tt as VertexAttributeTexture,Ie as acceleratedRaycast,Te as computeBatchedBoundsTree,we as computeBoundsTree,_e as disposeBatchedBoundsTree,Ae as disposeBoundsTree,xe as estimateMemoryInBytes,ye as getBVHExtremes,ge as getJSONStructure,qe as getTriangleHitPointInfo,Fe as shaderDistanceFunction,Ne as shaderIntersectFunction,Ee as shaderStructs,ve as validateBounds};
