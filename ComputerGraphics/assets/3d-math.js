!function(t,r){"function"==typeof define&&define.amd?define([],r):t.m4=r()}(this,function(){"use strict";function t(t,r,n){return(n=n||new Float32Array(3))[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],n}function r(t,r){r=r||new Float32Array(3);var n=Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);return n>1e-5&&(r[0]=t[0]/n,r[1]=t[1]/n,r[2]=t[2]/n),r}function n(t,r,n){return(n=n||new Float32Array(3))[0]=t[1]*r[2]-t[2]*r[1],n[1]=t[2]*r[0]-t[0]*r[2],n[2]=t[0]*r[1]-t[1]*r[0],n}function a(t,r){const n=t[0]-r[0],a=t[1]-r[1],o=t[2]-r[2];return n*n+a*a+o*o}function o(t,r){r=r||new Float32Array(16);var n=t[0],a=t[1],o=t[2],e=t[3],u=t[4],i=t[5],s=t[6],c=t[7],f=t[8],l=t[9],y=t[10],A=t[11],w=t[12],F=t[13],d=t[14],h=t[15],v=y*h,M=d*A,m=s*h,R=d*c,p=s*A,q=y*c,x=o*h,z=d*e,V=o*A,g=y*e,P=o*c,b=s*e,k=f*F,D=w*l,I=u*F,N=w*i,S=u*l,j=f*i,B=n*F,C=w*a,E=n*l,G=f*a,H=n*i,J=u*a,K=v*i+R*l+p*F-(M*i+m*l+q*F),L=M*a+x*l+g*F-(v*a+z*l+V*F),O=m*a+z*i+P*F-(R*a+x*i+b*F),Q=q*a+V*i+b*l-(p*a+g*i+P*l),T=1/(n*K+u*L+f*O+w*Q);return r[0]=T*K,r[1]=T*L,r[2]=T*O,r[3]=T*Q,r[4]=T*(M*u+m*f+q*w-(v*u+R*f+p*w)),r[5]=T*(v*n+z*f+V*w-(M*n+x*f+g*w)),r[6]=T*(R*n+x*u+b*w-(m*n+z*u+P*w)),r[7]=T*(p*n+g*u+P*f-(q*n+V*u+b*f)),r[8]=T*(k*c+N*A+S*h-(D*c+I*A+j*h)),r[9]=T*(D*e+B*A+G*h-(k*e+C*A+E*h)),r[10]=T*(I*e+C*c+H*h-(N*e+B*c+J*h)),r[11]=T*(j*e+E*c+J*A-(S*e+G*c+H*A)),r[12]=T*(I*y+j*d+D*s-(S*d+k*s+N*y)),r[13]=T*(E*d+k*o+C*y-(B*y+G*d+D*o)),r[14]=T*(B*s+J*d+N*o-(H*d+I*o+C*s)),r[15]=T*(H*y+S*o+G*s-(E*s+J*y+j*o)),r}return{copy:function(t,r){return(r=r||new Float32Array(16))[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r[4]=t[4],r[5]=t[5],r[6]=t[6],r[7]=t[7],r[8]=t[8],r[9]=t[9],r[10]=t[10],r[11]=t[11],r[12]=t[12],r[13]=t[13],r[14]=t[14],r[15]=t[15],r},lookAt:function(a,o,e,u){u=u||new Float32Array(16);var i=r(t(a,o)),s=r(n(e,i)),c=r(n(i,s));return u[0]=s[0],u[1]=s[1],u[2]=s[2],u[3]=0,u[4]=c[0],u[5]=c[1],u[6]=c[2],u[7]=0,u[8]=i[0],u[9]=i[1],u[10]=i[2],u[11]=0,u[12]=a[0],u[13]=a[1],u[14]=a[2],u[15]=1,u},addVectors:function(t,r,n){return(n=n||new Float32Array(3))[0]=t[0]+r[0],n[1]=t[1]+r[1],n[2]=t[2]+r[2],n},subtractVectors:t,distance:function(t,r){return Math.sqrt(a(t,r))},distanceSq:a,normalize:r,cross:n,dot:function(t,r){return t[0]*r[0]+t[1]*r[1]+t[2]*r[2]},identity:function(t){return(t=t||new Float32Array(16))[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},transpose:function(t,r){return(r=r||new Float32Array(16))[0]=t[0],r[1]=t[4],r[2]=t[8],r[3]=t[12],r[4]=t[1],r[5]=t[5],r[6]=t[9],r[7]=t[13],r[8]=t[2],r[9]=t[6],r[10]=t[10],r[11]=t[14],r[12]=t[3],r[13]=t[7],r[14]=t[11],r[15]=t[15],r},orthographic:function(t,r,n,a,o,e,u){return(u=u||new Float32Array(16))[0]=2/(r-t),u[1]=0,u[2]=0,u[3]=0,u[4]=0,u[5]=2/(a-n),u[6]=0,u[7]=0,u[8]=0,u[9]=0,u[10]=2/(o-e),u[11]=0,u[12]=(t+r)/(t-r),u[13]=(n+a)/(n-a),u[14]=(o+e)/(o-e),u[15]=1,u},frustum:function(t,r,n,a,o,e){var u=r-t,i=a-n,s=e-o;return dst[0]=2*o/u,dst[1]=0,dst[2]=0,dst[3]=0,dst[4]=0,dst[5]=2*o/i,dst[6]=0,dst[7]=0,dst[8]=(t+r)/u,dst[9]=(a+n)/i,dst[10]=-(e+o)/s,dst[11]=-1,dst[12]=0,dst[13]=0,dst[14]=-2*o*e/s,dst[15]=0,dst},perspective:function(t,r,n,a,o){o=o||new Float32Array(16);var e=Math.tan(.5*Math.PI-.5*t),u=1/(n-a);return o[0]=e/r,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=e,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[10]=(n+a)*u,o[11]=-1,o[12]=0,o[13]=0,o[14]=n*a*u*2,o[15]=0,o},translation:function(t,r,n,a){return(a=a||new Float32Array(16))[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=1,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=1,a[11]=0,a[12]=t,a[13]=r,a[14]=n,a[15]=1,a},translate:function(t,r,n,a,o){o=o||new Float32Array(16);var e=t[0],u=t[1],i=t[2],s=t[3],c=t[4],f=t[5],l=t[6],y=t[7],A=t[8],w=t[9],F=t[10],d=t[11],h=t[12],v=t[13],M=t[14],m=t[15];return t!==o&&(o[0]=e,o[1]=u,o[2]=i,o[3]=s,o[4]=c,o[5]=f,o[6]=l,o[7]=y,o[8]=A,o[9]=w,o[10]=F,o[11]=d),o[12]=e*r+c*n+A*a+h,o[13]=u*r+f*n+w*a+v,o[14]=i*r+l*n+F*a+M,o[15]=s*r+y*n+d*a+m,o},xRotation:function(t,r){r=r||new Float32Array(16);var n=Math.cos(t),a=Math.sin(t);return r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=n,r[6]=a,r[7]=0,r[8]=0,r[9]=-a,r[10]=n,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r},yRotation:function(t,r){r=r||new Float32Array(16);var n=Math.cos(t),a=Math.sin(t);return r[0]=n,r[1]=0,r[2]=-a,r[3]=0,r[4]=0,r[5]=1,r[6]=0,r[7]=0,r[8]=a,r[9]=0,r[10]=n,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r},zRotation:function(t,r){r=r||new Float32Array(16);var n=Math.cos(t),a=Math.sin(t);return r[0]=n,r[1]=a,r[2]=0,r[3]=0,r[4]=-a,r[5]=n,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=1,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r},xRotate:function(t,r,n){n=n||new Float32Array(16);var a=t[4],o=t[5],e=t[6],u=t[7],i=t[8],s=t[9],c=t[10],f=t[11],l=Math.cos(r),y=Math.sin(r);return n[4]=l*a+y*i,n[5]=l*o+y*s,n[6]=l*e+y*c,n[7]=l*u+y*f,n[8]=l*i-y*a,n[9]=l*s-y*o,n[10]=l*c-y*e,n[11]=l*f-y*u,t!==n&&(n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n},yRotate:function(t,r,n){n=n||new Float32Array(16);var a=t[0],o=t[1],e=t[2],u=t[3],i=t[8],s=t[9],c=t[10],f=t[11],l=Math.cos(r),y=Math.sin(r);return n[0]=l*a-y*i,n[1]=l*o-y*s,n[2]=l*e-y*c,n[3]=l*u-y*f,n[8]=l*i+y*a,n[9]=l*s+y*o,n[10]=l*c+y*e,n[11]=l*f+y*u,t!==n&&(n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n},zRotate:function(t,r,n){n=n||new Float32Array(16);var a=t[0],o=t[1],e=t[2],u=t[3],i=t[4],s=t[5],c=t[6],f=t[7],l=Math.cos(r),y=Math.sin(r);return n[0]=l*a+y*i,n[1]=l*o+y*s,n[2]=l*e+y*c,n[3]=l*u+y*f,n[4]=l*i-y*a,n[5]=l*s-y*o,n[6]=l*c-y*e,n[7]=l*f-y*u,t!==n&&(n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n},axisRotation:function(t,r,n){n=n||new Float32Array(16);var a=t[0],o=t[1],e=t[2],u=Math.sqrt(a*a+o*o+e*e),i=(a/=u)*a,s=(o/=u)*o,c=(e/=u)*e,f=Math.cos(r),l=Math.sin(r),y=1-f;return n[0]=i+(1-i)*f,n[1]=a*o*y+e*l,n[2]=a*e*y-o*l,n[3]=0,n[4]=a*o*y-e*l,n[5]=s+(1-s)*f,n[6]=o*e*y+a*l,n[7]=0,n[8]=a*e*y+o*l,n[9]=o*e*y-a*l,n[10]=c+(1-c)*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n},axisRotate:function(t,r,n,a){a=a||new Float32Array(16);var o=r[0],e=r[1],u=r[2],i=Math.sqrt(o*o+e*e+u*u),s=(o/=i)*o,c=(e/=i)*e,f=(u/=i)*u,l=Math.cos(n),y=Math.sin(n),A=1-l,w=s+(1-s)*l,F=o*e*A+u*y,d=o*u*A-e*y,h=o*e*A-u*y,v=c+(1-c)*l,M=e*u*A+o*y,m=o*u*A+e*y,R=e*u*A-o*y,p=f+(1-f)*l,q=t[0],x=t[1],z=t[2],V=t[3],g=t[4],P=t[5],b=t[6],k=t[7],D=t[8],I=t[9],N=t[10],S=t[11];return a[0]=w*q+F*g+d*D,a[1]=w*x+F*P+d*I,a[2]=w*z+F*b+d*N,a[3]=w*V+F*k+d*S,a[4]=h*q+v*g+M*D,a[5]=h*x+v*P+M*I,a[6]=h*z+v*b+M*N,a[7]=h*V+v*k+M*S,a[8]=m*q+R*g+p*D,a[9]=m*x+R*P+p*I,a[10]=m*z+R*b+p*N,a[11]=m*V+R*k+p*S,t!==a&&(a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15]),a},scaling:function(t,r,n,a){return(a=a||new Float32Array(16))[0]=t,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=r,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=n,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},scale:function(t,r,n,a,o){return(o=o||new Float32Array(16))[0]=r*t[0],o[1]=r*t[1],o[2]=r*t[2],o[3]=r*t[3],o[4]=n*t[4],o[5]=n*t[5],o[6]=n*t[6],o[7]=n*t[7],o[8]=a*t[8],o[9]=a*t[9],o[10]=a*t[10],o[11]=a*t[11],t!==o&&(o[12]=t[12],o[13]=t[13],o[14]=t[14],o[15]=t[15]),o},multiply:function(t,r,n){n=n||new Float32Array(16);var a=r[0],o=r[1],e=r[2],u=r[3],i=r[4],s=r[5],c=r[6],f=r[7],l=r[8],y=r[9],A=r[10],w=r[11],F=r[12],d=r[13],h=r[14],v=r[15],M=t[0],m=t[1],R=t[2],p=t[3],q=t[4],x=t[5],z=t[6],V=t[7],g=t[8],P=t[9],b=t[10],k=t[11],D=t[12],I=t[13],N=t[14],S=t[15];return n[0]=a*M+o*q+e*g+u*D,n[1]=a*m+o*x+e*P+u*I,n[2]=a*R+o*z+e*b+u*N,n[3]=a*p+o*V+e*k+u*S,n[4]=i*M+s*q+c*g+f*D,n[5]=i*m+s*x+c*P+f*I,n[6]=i*R+s*z+c*b+f*N,n[7]=i*p+s*V+c*k+f*S,n[8]=l*M+y*q+A*g+w*D,n[9]=l*m+y*x+A*P+w*I,n[10]=l*R+y*z+A*b+w*N,n[11]=l*p+y*V+A*k+w*S,n[12]=F*M+d*q+h*g+v*D,n[13]=F*m+d*x+h*P+v*I,n[14]=F*R+d*z+h*b+v*N,n[15]=F*p+d*V+h*k+v*S,n},inverse:o,transformVector:function(t,r,n){n=n||new Float32Array(4);for(var a=0;a<4;++a){n[a]=0;for(var o=0;o<4;++o)n[a]+=r[o]*t[4*o+a]}return n},transformPoint:function(t,r,n){n=n||new Float32Array(3);var a=r[0],o=r[1],e=r[2],u=a*t[3]+o*t[7]+e*t[11]+t[15];return n[0]=(a*t[0]+o*t[4]+e*t[8]+t[12])/u,n[1]=(a*t[1]+o*t[5]+e*t[9]+t[13])/u,n[2]=(a*t[2]+o*t[6]+e*t[10]+t[14])/u,n},transformDirection:function(t,r,n){n=n||new Float32Array(3);var a=r[0],o=r[1],e=r[2];return n[0]=a*t[0]+o*t[4]+e*t[8],n[1]=a*t[1]+o*t[5]+e*t[9],n[2]=a*t[2]+o*t[6]+e*t[10],n},transformNormal:function(t,r,n){n=n||new Float32Array(3);var a=o(t),e=r[0],u=r[1],i=r[2];return n[0]=e*a[0]+u*a[1]+i*a[2],n[1]=e*a[4]+u*a[5]+i*a[6],n[2]=e*a[8]+u*a[9]+i*a[10],n}}});