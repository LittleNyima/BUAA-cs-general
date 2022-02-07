function _argumentsToArray(t){return[].concat.apply([],Array.prototype.slice.apply(t))}function radians(t){return t*Math.PI/180}function vec2(){let t=_argumentsToArray(arguments);switch(t.length){case 0:t.push(0);case 1:t.push(0)}return t.splice(0,2)}function vec3(){let t=_argumentsToArray(arguments);switch(t.length){case 0:t.push(0);case 1:t.push(0);case 2:t.push(0)}return t.splice(0,3)}function vec4(){let t=_argumentsToArray(arguments);switch(t.length){case 0:t.push(0);case 1:t.push(0);case 2:t.push(0);case 3:t.push(1)}return t.splice(0,4)}function mat2(){let t=_argumentsToArray(arguments),e=[];switch(t.length){case 0:t[0]=1;case 1:e=[vec2(t[0],0),vec2(0,t[0])];break;default:e.push(vec2(t)),t.splice(0,2),e.push(vec2(t))}return e.matrix=!0,e}function mat3(){let t=_argumentsToArray(arguments),e=[];switch(t.length){case 0:t[0]=1;case 1:e=[vec3(t[0],0,0),vec3(0,t[0],0),vec3(0,0,t[0])];break;default:e.push(vec3(t)),t.splice(0,3),e.push(vec3(t)),t.splice(0,3),e.push(vec3(t))}return e.matrix=!0,e}function mat4(){let t=_argumentsToArray(arguments),e=[];switch(t.length){case 0:t[0]=1;case 1:e=[vec4(t[0],0,0,0),vec4(0,t[0],0,0),vec4(0,0,t[0],0),vec4(0,0,0,t[0])];break;default:e.push(vec4(t)),t.splice(0,4),e.push(vec4(t)),t.splice(0,4),e.push(vec4(t)),t.splice(0,4),e.push(vec4(t))}return e.matrix=!0,e}function equal(t,e){if(t.length!==e.length)return!1;if(t.matrix&&e.matrix)for(let r=0;r<t.length;++r){if(t[r].length!==e[r].length)return!1;for(let n=0;n<t[r].length;++n)if(t[r][n]!==e[r][n])return!1}else{if(t.matrix&&!e.matrix||!t.matrix&&e.matrix)return!1;for(let r=0;r<t.length;++r)if(t[r]!==e[r])return!1}return!0}function add(t,e){let r=[];if(t.matrix&&e.matrix){if(t.length!==e.length)throw"add(): trying to add matrices of different dimensions";for(let n=0;n<t.length;++n){if(t[n].length!==e[n].length)throw"add(): trying to add matrices of different dimensions";r.push([]);for(let a=0;a<t[n].length;++a)r[n].push(t[n][a]+e[n][a])}return r.matrix=!0,r}if(t.matrix&&!e.matrix||!t.matrix&&e.matrix)throw"add(): trying to add matrix and non-matrix letiables";if(t.length!==e.length)throw"add(): vectors are not the same dimension";for(let n=0;n<t.length;++n)r.push(t[n]+e[n]);return r}function subtract(t,e){let r=[];if(t.matrix&&e.matrix){if(t.length!==e.length)throw"subtract(): trying to subtract matrices of different dimensions";for(let n=0;n<t.length;++n){if(t[n].length!==e[n].length)throw"subtract(): trying to subtact matrices of different dimensions";r.push([]);for(let a=0;a<t[n].length;++a)r[n].push(t[n][a]-e[n][a])}return r.matrix=!0,r}if(t.matrix&&!e.matrix||!t.matrix&&e.matrix)throw"subtract(): trying to subtract  matrix and non-matrix letiables";if(t.length!==e.length)throw"subtract(): vectors are not the same length";for(let n=0;n<t.length;++n)r.push(t[n]-e[n]);return r}function mult(t,e){let r=[];if(t.matrix&&e.matrix){if(t.length!==e.length)throw"mult(): trying to add matrices of different dimensions";for(let r=0;r<t.length;++r)if(t[r].length!==e[r].length)throw"mult(): trying to add matrices of different dimensions";for(let n=0;n<t.length;++n){r.push([]);for(let a=0;a<e.length;++a){let i=0;for(let r=0;r<t.length;++r)i+=t[n][r]*e[r][a];r[n].push(i)}}return r.matrix=!0,r}if(t.matrix&&t.length===e.length){for(let n=0;n<e.length;n++){let a=0;for(let r=0;r<e.length;r++)a+=t[n][r]*e[r];r.push(a)}return r}if(t.length!==e.length)throw"mult(): vectors are not the same dimension";for(let n=0;n<t.length;++n)r.push(t[n]*e[n]);return r}function translate(t,e,r){Array.isArray(t)&&3===t.length&&(r=t[2],e=t[1],t=t[0]);let n=mat4();return n[0][3]=t,n[1][3]=e,n[2][3]=r,n}function rotate(t,e){Array.isArray(e)||(e=[arguments[1],arguments[2],arguments[3]]);let r=normalize(e),n=r[0],a=r[1],i=r[2],c=Math.cos(radians(t)),o=1-c,l=Math.sin(radians(t));return mat4(vec4(n*n*o+c,n*a*o-i*l,n*i*o+a*l,0),vec4(n*a*o+i*l,a*a*o+c,a*i*o-n*l,0),vec4(n*i*o-a*l,a*i*o+n*l,i*i*o+c,0),vec4())}function rotateX(t){let e=Math.cos(radians(t)),r=Math.sin(radians(t));return mat4(1,0,0,0,0,e,-r,0,0,r,e,0,0,0,0,1)}function rotateY(t){let e=Math.cos(radians(t)),r=Math.sin(radians(t));return mat4(e,0,r,0,0,1,0,0,-r,0,e,0,0,0,0,1)}function rotateZ(t){let e=Math.cos(radians(t)),r=Math.sin(radians(t));return mat4(e,-r,0,0,r,e,0,0,0,0,1,0,0,0,0,1)}function scalem(t,e,r){Array.isArray(t)&&3===t.length&&(r=t[2],e=t[1],t=t[0]);let n=mat4();return n[0][0]=t,n[1][1]=e,n[2][2]=r,n}function lookAt(t,e,r){if(!Array.isArray(t)||3!==t.length)throw"lookAt(): first parameter [eye] must be an a vec3";if(!Array.isArray(e)||3!==e.length)throw"lookAt(): first parameter [at] must be an a vec3";if(!Array.isArray(r)||3!==r.length)throw"lookAt(): first parameter [up] must be an a vec3";if(equal(t,e))return mat4();let n=normalize(subtract(e,t)),a=normalize(cross(n,r)),i=normalize(cross(a,n));return n=negate(n),mat4(vec4(a,-dot(a,t)),vec4(i,-dot(i,t)),vec4(n,-dot(n,t)),vec4())}function ortho(t,e,r,n,a,i){if(t===e)throw"ortho(): left and right are equal";if(r===n)throw"ortho(): bottom and top are equal";if(a===i)throw"ortho(): near and far are equal";let c=e-t,o=n-r,l=i-a,s=mat4();return s[0][0]=2/c,s[1][1]=2/o,s[2][2]=-2/l,s[0][3]=-(t+e)/c,s[1][3]=-(n+r)/o,s[2][3]=-(a+i)/l,s}function perspective(t,e,r,n){let a=1/Math.tan(radians(t)/2),i=n-r,c=mat4();return c[0][0]=a/e,c[1][1]=a,c[2][2]=-(r+n)/i,c[2][3]=-2*r*n/i,c[3][2]=-1,c[3][3]=0,c}function transpose(t){if(!t.matrix)return"transpose(): trying to transpose a non-matrix";let e=[];for(let r=0;r<t.length;++r){e.push([]);for(let n=0;n<t[r].length;++n)e[r].push(t[n][r])}return e.matrix=!0,e}function dot(t,e){if(t.length!==e.length)throw"dot(): vectors are not the same dimension";let r=0;for(let n=0;n<t.length;++n)r+=t[n]*e[n];return r}function negate(t){let e=[];for(let r=0;r<t.length;++r)e.push(-t[r]);return e}function cross(t,e){if(!Array.isArray(t)||t.length<3)throw"cross(): first argument is not a vector of at least 3";if(!Array.isArray(e)||e.length<3)throw"cross(): second argument is not a vector of at least 3";return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]]}function length(t){return Math.sqrt(dot(t,t))}function normalize(t,e){let r;e&&(r=t.pop());let n=length(t);if(!isFinite(n))throw"normalize: vector "+t+" has zero length";for(let e=0;e<t.length;++e)t[e]/=n;return e&&t.push(r),t}function mix(t,e,r){if("number"!=typeof r)throw"mix: the last paramter "+r+" must be a number";if(t.length!==e.length)throw"vector dimension mismatch";let n=[];for(let a=0;a<t.length;++a)n.push((1-r)*t[a]+r*e[a]);return n}function scale(t,e){if(!Array.isArray(e))throw"scale: second parameter "+e+" is not a vector";let r=[];for(let n=0;n<e.length;++n)r.push(t*e[n]);return r}function flatten(t){!0===t.matrix&&(t=transpose(t));let e=t.length,r=!1;Array.isArray(t[0])&&(r=!0,e*=t[0].length);let n=new Float32Array(e);if(r){let e=0;for(let r=0;r<t.length;++r)for(let a=0;a<t[r].length;++a)n[e++]=t[r][a]}else for(let e=0;e<t.length;++e)n[e]=t[e];return n}let sizeof={vec2:new Float32Array(flatten(vec2())).byteLength,vec3:new Float32Array(flatten(vec3())).byteLength,vec4:new Float32Array(flatten(vec4())).byteLength,mat2:new Float32Array(flatten(mat2())).byteLength,mat3:new Float32Array(flatten(mat3())).byteLength,mat4:new Float32Array(flatten(mat4())).byteLength};function printm(t){if(2===t.length)for(let e=0;e<t.length;e++)console.log(t[e][0],t[e][1]);else if(3===t.length)for(let e=0;e<t.length;e++)console.log(t[e][0],t[e][1],t[e][2]);else if(4===t.length)for(let e=0;e<t.length;e++)console.log(t[e][0],t[e][1],t[e][2],t[e][3])}function det2(t){return t[0][0]*t[1][1]-t[0][1]*t[1][0]}function det3(t){return t[0][0]*t[1][1]*t[2][2]+t[0][1]*t[1][2]*t[2][0]+t[0][2]*t[2][1]*t[1][0]-t[2][0]*t[1][1]*t[0][2]-t[1][0]*t[0][1]*t[2][2]-t[0][0]*t[1][2]*t[2][1]}function det4(t){let e=[vec3(t[1][1],t[1][2],t[1][3]),vec3(t[2][1],t[2][2],t[2][3]),vec3(t[3][1],t[3][2],t[3][3])],r=[vec3(t[1][0],t[1][2],t[1][3]),vec3(t[2][0],t[2][2],t[2][3]),vec3(t[3][0],t[3][2],t[3][3])],n=[vec3(t[1][0],t[1][1],t[1][3]),vec3(t[2][0],t[2][1],t[2][3]),vec3(t[3][0],t[3][1],t[3][3])],a=[vec3(t[1][0],t[1][1],t[1][2]),vec3(t[2][0],t[2][1],t[2][2]),vec3(t[3][0],t[3][1],t[3][2])];return t[0][0]*det3(e)-t[0][1]*det3(r)+t[0][2]*det3(n)-t[0][3]*det3(a)}function det(t){return!0!==t.matrix&&console.log("not a matrix"),2===t.length?det2(t):3===t.length?det3(t):4===t.length?det4(t):void 0}function inverse2(t){let e=mat2(),r=det2(t);return e[0][0]=t[1][1]/r,e[0][1]=-t[0][1]/r,e[1][0]=-t[1][0]/r,e[1][1]=t[0][0]/r,e.matrix=!0,e}function inverse3(t){let e=mat3(),r=det3(t),n=[vec2(t[1][1],t[1][2]),vec2(t[2][1],t[2][2])],a=[vec2(t[1][0],t[1][2]),vec2(t[2][0],t[2][2])],i=[vec2(t[1][0],t[1][1]),vec2(t[2][0],t[2][1])],c=[vec2(t[0][1],t[0][2]),vec2(t[2][1],t[2][2])],o=[vec2(t[0][0],t[0][2]),vec2(t[2][0],t[2][2])],l=[vec2(t[0][0],t[0][1]),vec2(t[2][0],t[2][1])],s=[vec2(t[0][1],t[0][2]),vec2(t[1][1],t[1][2])],h=[vec2(t[0][0],t[0][2]),vec2(t[1][0],t[1][2])],u=[vec2(t[0][0],t[0][1]),vec2(t[1][0],t[1][1])];return e[0][0]=det2(n)/r,e[0][1]=-det2(c)/r,e[0][2]=det2(s)/r,e[1][0]=-det2(a)/r,e[1][1]=det2(o)/r,e[1][2]=-det2(h)/r,e[2][0]=det2(i)/r,e[2][1]=-det2(l)/r,e[2][2]=det2(u)/r,e}function inverse4(t){let e=mat4(),r=det4(t),n=[vec3(t[1][1],t[1][2],t[1][3]),vec3(t[2][1],t[2][2],t[2][3]),vec3(t[3][1],t[3][2],t[3][3])],a=[vec3(t[1][0],t[1][2],t[1][3]),vec3(t[2][0],t[2][2],t[2][3]),vec3(t[3][0],t[3][2],t[3][3])],i=[vec3(t[1][0],t[1][1],t[1][3]),vec3(t[2][0],t[2][1],t[2][3]),vec3(t[3][0],t[3][1],t[3][3])],c=[vec3(t[1][0],t[1][1],t[1][2]),vec3(t[2][0],t[2][1],t[2][2]),vec3(t[3][0],t[3][1],t[3][2])],o=[vec3(t[0][1],t[0][2],t[0][3]),vec3(t[2][1],t[2][2],t[2][3]),vec3(t[3][1],t[3][2],t[3][3])],l=[vec3(t[0][0],t[0][2],t[0][3]),vec3(t[2][0],t[2][2],t[2][3]),vec3(t[3][0],t[3][2],t[3][3])],s=[vec3(t[0][0],t[0][1],t[0][3]),vec3(t[2][0],t[2][1],t[2][3]),vec3(t[3][0],t[3][1],t[3][3])],h=[vec3(t[0][0],t[0][1],t[0][2]),vec3(t[2][0],t[2][1],t[2][2]),vec3(t[3][0],t[3][1],t[3][2])],u=[vec3(t[0][1],t[0][2],t[0][3]),vec3(t[1][1],t[1][2],t[1][3]),vec3(t[3][1],t[3][2],t[3][3])],f=[vec3(t[0][0],t[0][2],t[0][3]),vec3(t[1][0],t[1][2],t[1][3]),vec3(t[3][0],t[3][2],t[3][3])],v=[vec3(t[0][0],t[0][1],t[0][3]),vec3(t[1][0],t[1][1],t[1][3]),vec3(t[3][0],t[3][1],t[3][3])],m=[vec3(t[0][0],t[0][1],t[0][2]),vec3(t[1][0],t[1][1],t[1][2]),vec3(t[3][0],t[3][1],t[3][2])],g=[vec3(t[0][1],t[0][2],t[0][3]),vec3(t[1][1],t[1][2],t[1][3]),vec3(t[2][1],t[2][2],t[2][3])],d=[vec3(t[0][0],t[0][2],t[0][3]),vec3(t[1][0],t[1][2],t[1][3]),vec3(t[2][0],t[2][2],t[2][3])],p=[vec3(t[0][0],t[0][1],t[0][3]),vec3(t[1][0],t[1][1],t[1][3]),vec3(t[2][0],t[2][1],t[2][3])],y=[vec3(t[0][0],t[0][1],t[0][2]),vec3(t[1][0],t[1][1],t[1][2]),vec3(t[2][0],t[2][1],t[2][2])];return e[0][0]=det3(n)/r,e[0][1]=-det3(o)/r,e[0][2]=det3(u)/r,e[0][3]=-det3(g)/r,e[1][0]=-det3(a)/r,e[1][1]=det3(l)/r,e[1][2]=-det3(f)/r,e[1][3]=det3(d)/r,e[2][0]=det3(i)/r,e[2][1]=-det3(s)/r,e[2][2]=det3(v)/r,e[2][3]=-det3(p)/r,e[3][0]=-det3(c)/r,e[3][1]=det3(h)/r,e[3][2]=-det3(m)/r,e[3][3]=det3(y)/r,e}function inverse(t){return!0!==t.matrix&&console.log("not a matrix"),2===t.length?inverse2(t):3===t.length?inverse3(t):4===t.length?inverse4(t):void 0}function normalMatrix(t,e){let r=mat4();if(r=inverse(transpose(t)),!0!==e)return r;{let t=mat3();for(let e=0;e<3;e++)for(let n=0;n<3;n++)t[e][n]=r[e][n];return t}}