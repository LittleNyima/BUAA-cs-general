!function(n,t){"function"==typeof define&&define.amd?define([],t):n.m4=t()}(this,function(){"use strict";let n=Float32Array;function t(t,r,e){return(e=e||new n(3))[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e}function r(t,r){r=r||new n(3);var e=Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);return e>1e-5&&(r[0]=t[0]/e,r[1]=t[1]/e,r[2]=t[2]/e),r}function e(t,r,e){return(e=e||new n(3))[0]=t[1]*r[2]-t[2]*r[1],e[1]=t[2]*r[0]-t[0]*r[2],e[2]=t[0]*r[1]-t[1]*r[0],e}function o(n,t){const r=n[0]-t[0],e=n[1]-t[1],o=n[2]-t[2];return r*r+e*e+o*o}function u(t,r){r=r||new n(16);var e=t[0],o=t[1],u=t[2],a=t[3],c=t[4],i=t[5],s=t[6],f=t[7],h=t[8],w=t[9],M=t[10],l=t[11],v=t[12],m=t[13],d=t[14],p=t[15],q=M*p,y=d*l,R=s*p,g=d*f,x=s*l,V=M*f,z=u*p,A=d*a,D=u*l,P=M*a,S=u*f,b=s*a,k=h*m,F=v*w,I=c*m,N=v*i,T=c*w,j=h*i,B=e*m,C=v*o,E=e*w,G=h*o,H=e*i,J=c*o,K=q*i+g*w+x*m-(y*i+R*w+V*m),L=y*o+z*w+P*m-(q*o+A*w+D*m),O=R*o+A*i+S*m-(g*o+z*i+b*m),Q=V*o+D*i+b*w-(x*o+P*i+S*w),U=1/(e*K+c*L+h*O+v*Q);return r[0]=U*K,r[1]=U*L,r[2]=U*O,r[3]=U*Q,r[4]=U*(y*c+R*h+V*v-(q*c+g*h+x*v)),r[5]=U*(q*e+A*h+D*v-(y*e+z*h+P*v)),r[6]=U*(g*e+z*c+b*v-(R*e+A*c+S*v)),r[7]=U*(x*e+P*c+S*h-(V*e+D*c+b*h)),r[8]=U*(k*f+N*l+T*p-(F*f+I*l+j*p)),r[9]=U*(F*a+B*l+G*p-(k*a+C*l+E*p)),r[10]=U*(I*a+C*f+H*p-(N*a+B*f+J*p)),r[11]=U*(j*a+E*f+J*l-(T*a+G*f+H*l)),r[12]=U*(I*M+j*d+F*s-(T*d+k*s+N*M)),r[13]=U*(E*d+k*u+C*M-(B*M+G*d+F*u)),r[14]=U*(B*s+J*d+N*u-(H*d+I*u+C*s)),r[15]=U*(H*M+T*u+G*s-(E*s+J*M+j*u)),r}return{copy:function(t,r){return(r=r||new n(16))[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r[4]=t[4],r[5]=t[5],r[6]=t[6],r[7]=t[7],r[8]=t[8],r[9]=t[9],r[10]=t[10],r[11]=t[11],r[12]=t[12],r[13]=t[13],r[14]=t[14],r[15]=t[15],r},lookAt:function(o,u,a,c){c=c||new n(16);var i=r(t(o,u)),s=r(e(a,i)),f=r(e(i,s));return c[0]=s[0],c[1]=s[1],c[2]=s[2],c[3]=0,c[4]=f[0],c[5]=f[1],c[6]=f[2],c[7]=0,c[8]=i[0],c[9]=i[1],c[10]=i[2],c[11]=0,c[12]=o[0],c[13]=o[1],c[14]=o[2],c[15]=1,c},addVectors:function(t,r,e){return(e=e||new n(3))[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e},subtractVectors:t,scaleVector:function(t,r,e){return(e=e||new n(3))[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e},distance:function(n,t){return Math.sqrt(o(n,t))},distanceSq:o,normalize:r,compose:function(t,r,e,o){o=o||new n(16);const u=r[0],a=r[1],c=r[2],i=r[3],s=u+u,f=a+a,h=c+c,w=u*s,M=u*f,l=u*h,v=a*f,m=a*h,d=c*h,p=i*s,q=i*f,y=i*h,R=e[0],g=e[1],x=e[2];return o[0]=(1-(v+d))*R,o[1]=(M+y)*R,o[2]=(l-q)*R,o[3]=0,o[4]=(M-y)*g,o[5]=(1-(w+d))*g,o[6]=(m+p)*g,o[7]=0,o[8]=(l+q)*x,o[9]=(m-p)*x,o[10]=(1-(w+v))*x,o[11]=0,o[12]=t[0],o[13]=t[1],o[14]=t[2],o[15]=1,o},cross:e,decompose:function(n,t,r,e){let o=m4.length(n.slice(0,3));const u=m4.length(n.slice(4,7)),a=m4.length(n.slice(8,11));var c,i,s,f,h,w,M,l,v,m,d,p,q,y,R,g,x,V,z,A,D,P,S,b,k,F,I,N,T;i=(c=n)[0],s=c[1],f=c[2],h=c[3],w=c[4],M=c[5],l=c[6],v=c[7],m=c[8],d=c[9],p=c[10],q=c[11],y=c[12],R=c[13],g=c[14],x=c[15],1/(i*((V=p*x)*M+(D=g*v)*d+(P=l*q)*R-((z=g*q)*M+(A=l*x)*d+(S=p*v)*R))+w*(z*s+(b=f*x)*d+(I=p*h)*R-(V*s+(k=g*h)*d+(F=f*q)*R))+m*(A*s+k*M+(N=f*v)*R-(D*s+b*M+(T=l*h)*R))+y*(S*s+F*M+T*d-(P*s+I*M+N*d)))<0&&(o=-o),t[0]=n[12],t[1]=n[13],t[2]=n[14];const j=m4.copy(n),B=1/o,C=1/u,E=1/a;j[0]*=B,j[1]*=B,j[2]*=B,j[4]*=C,j[5]*=C,j[6]*=C,j[8]*=E,j[9]*=E,j[10]*=E,function(n,t){const r=n[0],e=n[4],o=n[8],u=n[1],a=n[5],c=n[9],i=n[2],s=n[6],f=n[10],h=r+a+f;if(h>0){const n=.5/Math.sqrt(h+1);t[3]=.25/n,t[0]=(s-c)*n,t[1]=(o-i)*n,t[2]=(u-e)*n}else if(r>a&&r>f){const n=2*Math.sqrt(1+r-a-f);t[3]=(s-c)/n,t[0]=.25*n,t[1]=(e+u)/n,t[2]=(o+i)/n}else if(a>f){const n=2*Math.sqrt(1+a-r-f);t[3]=(o-i)/n,t[0]=(e+u)/n,t[1]=.25*n,t[2]=(c+s)/n}else{const n=2*Math.sqrt(1+f-r-a);t[3]=(u-e)/n,t[0]=(o+i)/n,t[1]=(c+s)/n,t[2]=.25*n}}(j,r),e[0]=o,e[1]=u,e[2]=a},dot:function(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]},identity:function(t){return(t=t||new n(16))[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},transpose:function(t,r){return(r=r||new n(16))[0]=t[0],r[1]=t[4],r[2]=t[8],r[3]=t[12],r[4]=t[1],r[5]=t[5],r[6]=t[9],r[7]=t[13],r[8]=t[2],r[9]=t[6],r[10]=t[10],r[11]=t[14],r[12]=t[3],r[13]=t[7],r[14]=t[11],r[15]=t[15],r},length:function(n){return Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2])},lengthSq:function(n){return n[0]*n[0]+n[1]*n[1]+n[2]*n[2]},orthographic:function(t,r,e,o,u,a,c){return(c=c||new n(16))[0]=2/(r-t),c[1]=0,c[2]=0,c[3]=0,c[4]=0,c[5]=2/(o-e),c[6]=0,c[7]=0,c[8]=0,c[9]=0,c[10]=2/(u-a),c[11]=0,c[12]=(t+r)/(t-r),c[13]=(e+o)/(e-o),c[14]=(u+a)/(u-a),c[15]=1,c},frustum:function(t,r,e,o,u,a,c){var i=r-t,s=o-e,f=a-u;return(c=c||new n(16))[0]=2*u/i,c[1]=0,c[2]=0,c[3]=0,c[4]=0,c[5]=2*u/s,c[6]=0,c[7]=0,c[8]=(t+r)/i,c[9]=(o+e)/s,c[10]=-(a+u)/f,c[11]=-1,c[12]=0,c[13]=0,c[14]=-2*u*a/f,c[15]=0,c},perspective:function(t,r,e,o,u){u=u||new n(16);var a=Math.tan(.5*Math.PI-.5*t),c=1/(e-o);return u[0]=a/r,u[1]=0,u[2]=0,u[3]=0,u[4]=0,u[5]=a,u[6]=0,u[7]=0,u[8]=0,u[9]=0,u[10]=(e+o)*c,u[11]=-1,u[12]=0,u[13]=0,u[14]=e*o*c*2,u[15]=0,u},translation:function(t,r,e,o){return(o=o||new n(16))[0]=1,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=1,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[10]=1,o[11]=0,o[12]=t,o[13]=r,o[14]=e,o[15]=1,o},translate:function(t,r,e,o,u){u=u||new n(16);var a=t[0],c=t[1],i=t[2],s=t[3],f=t[4],h=t[5],w=t[6],M=t[7],l=t[8],v=t[9],m=t[10],d=t[11],p=t[12],q=t[13],y=t[14],R=t[15];return t!==u&&(u[0]=a,u[1]=c,u[2]=i,u[3]=s,u[4]=f,u[5]=h,u[6]=w,u[7]=M,u[8]=l,u[9]=v,u[10]=m,u[11]=d),u[12]=a*r+f*e+l*o+p,u[13]=c*r+h*e+v*o+q,u[14]=i*r+w*e+m*o+y,u[15]=s*r+M*e+d*o+R,u},xRotation:function(t,r){r=r||new n(16);var e=Math.cos(t),o=Math.sin(t);return r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=e,r[6]=o,r[7]=0,r[8]=0,r[9]=-o,r[10]=e,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r},yRotation:function(t,r){r=r||new n(16);var e=Math.cos(t),o=Math.sin(t);return r[0]=e,r[1]=0,r[2]=-o,r[3]=0,r[4]=0,r[5]=1,r[6]=0,r[7]=0,r[8]=o,r[9]=0,r[10]=e,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r},zRotation:function(t,r){r=r||new n(16);var e=Math.cos(t),o=Math.sin(t);return r[0]=e,r[1]=o,r[2]=0,r[3]=0,r[4]=-o,r[5]=e,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=1,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r},xRotate:function(t,r,e){e=e||new n(16);var o=t[4],u=t[5],a=t[6],c=t[7],i=t[8],s=t[9],f=t[10],h=t[11],w=Math.cos(r),M=Math.sin(r);return e[4]=w*o+M*i,e[5]=w*u+M*s,e[6]=w*a+M*f,e[7]=w*c+M*h,e[8]=w*i-M*o,e[9]=w*s-M*u,e[10]=w*f-M*a,e[11]=w*h-M*c,t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e},yRotate:function(t,r,e){e=e||new n(16);var o=t[0],u=t[1],a=t[2],c=t[3],i=t[8],s=t[9],f=t[10],h=t[11],w=Math.cos(r),M=Math.sin(r);return e[0]=w*o-M*i,e[1]=w*u-M*s,e[2]=w*a-M*f,e[3]=w*c-M*h,e[8]=w*i+M*o,e[9]=w*s+M*u,e[10]=w*f+M*a,e[11]=w*h+M*c,t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e},zRotate:function(t,r,e){e=e||new n(16);var o=t[0],u=t[1],a=t[2],c=t[3],i=t[4],s=t[5],f=t[6],h=t[7],w=Math.cos(r),M=Math.sin(r);return e[0]=w*o+M*i,e[1]=w*u+M*s,e[2]=w*a+M*f,e[3]=w*c+M*h,e[4]=w*i-M*o,e[5]=w*s-M*u,e[6]=w*f-M*a,e[7]=w*h-M*c,t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e},axisRotation:function(t,r,e){e=e||new n(16);var o=t[0],u=t[1],a=t[2],c=Math.sqrt(o*o+u*u+a*a),i=(o/=c)*o,s=(u/=c)*u,f=(a/=c)*a,h=Math.cos(r),w=Math.sin(r),M=1-h;return e[0]=i+(1-i)*h,e[1]=o*u*M+a*w,e[2]=o*a*M-u*w,e[3]=0,e[4]=o*u*M-a*w,e[5]=s+(1-s)*h,e[6]=u*a*M+o*w,e[7]=0,e[8]=o*a*M+u*w,e[9]=u*a*M-o*w,e[10]=f+(1-f)*h,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},axisRotate:function(t,r,e,o){o=o||new n(16);var u=r[0],a=r[1],c=r[2],i=Math.sqrt(u*u+a*a+c*c),s=(u/=i)*u,f=(a/=i)*a,h=(c/=i)*c,w=Math.cos(e),M=Math.sin(e),l=1-w,v=s+(1-s)*w,m=u*a*l+c*M,d=u*c*l-a*M,p=u*a*l-c*M,q=f+(1-f)*w,y=a*c*l+u*M,R=u*c*l+a*M,g=a*c*l-u*M,x=h+(1-h)*w,V=t[0],z=t[1],A=t[2],D=t[3],P=t[4],S=t[5],b=t[6],k=t[7],F=t[8],I=t[9],N=t[10],T=t[11];return o[0]=v*V+m*P+d*F,o[1]=v*z+m*S+d*I,o[2]=v*A+m*b+d*N,o[3]=v*D+m*k+d*T,o[4]=p*V+q*P+y*F,o[5]=p*z+q*S+y*I,o[6]=p*A+q*b+y*N,o[7]=p*D+q*k+y*T,o[8]=R*V+g*P+x*F,o[9]=R*z+g*S+x*I,o[10]=R*A+g*b+x*N,o[11]=R*D+g*k+x*T,t!==o&&(o[12]=t[12],o[13]=t[13],o[14]=t[14],o[15]=t[15]),o},scaling:function(t,r,e,o){return(o=o||new n(16))[0]=t,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=r,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[10]=e,o[11]=0,o[12]=0,o[13]=0,o[14]=0,o[15]=1,o},scale:function(t,r,e,o,u){return(u=u||new n(16))[0]=r*t[0],u[1]=r*t[1],u[2]=r*t[2],u[3]=r*t[3],u[4]=e*t[4],u[5]=e*t[5],u[6]=e*t[6],u[7]=e*t[7],u[8]=o*t[8],u[9]=o*t[9],u[10]=o*t[10],u[11]=o*t[11],t!==u&&(u[12]=t[12],u[13]=t[13],u[14]=t[14],u[15]=t[15]),u},multiply:function(t,r,e){e=e||new n(16);var o=r[0],u=r[1],a=r[2],c=r[3],i=r[4],s=r[5],f=r[6],h=r[7],w=r[8],M=r[9],l=r[10],v=r[11],m=r[12],d=r[13],p=r[14],q=r[15],y=t[0],R=t[1],g=t[2],x=t[3],V=t[4],z=t[5],A=t[6],D=t[7],P=t[8],S=t[9],b=t[10],k=t[11],F=t[12],I=t[13],N=t[14],T=t[15];return e[0]=o*y+u*V+a*P+c*F,e[1]=o*R+u*z+a*S+c*I,e[2]=o*g+u*A+a*b+c*N,e[3]=o*x+u*D+a*k+c*T,e[4]=i*y+s*V+f*P+h*F,e[5]=i*R+s*z+f*S+h*I,e[6]=i*g+s*A+f*b+h*N,e[7]=i*x+s*D+f*k+h*T,e[8]=w*y+M*V+l*P+v*F,e[9]=w*R+M*z+l*S+v*I,e[10]=w*g+M*A+l*b+v*N,e[11]=w*x+M*D+l*k+v*T,e[12]=m*y+d*V+p*P+q*F,e[13]=m*R+d*z+p*S+q*I,e[14]=m*g+d*A+p*b+q*N,e[15]=m*x+d*D+p*k+q*T,e},inverse:u,transformVector:function(t,r,e){e=e||new n(4);for(var o=0;o<4;++o){e[o]=0;for(var u=0;u<4;++u)e[o]+=r[u]*t[4*u+o]}return e},transformPoint:function(t,r,e){e=e||new n(3);var o=r[0],u=r[1],a=r[2],c=o*t[3]+u*t[7]+a*t[11]+t[15];return e[0]=(o*t[0]+u*t[4]+a*t[8]+t[12])/c,e[1]=(o*t[1]+u*t[5]+a*t[9]+t[13])/c,e[2]=(o*t[2]+u*t[6]+a*t[10]+t[14])/c,e},transformDirection:function(t,r,e){e=e||new n(3);var o=r[0],u=r[1],a=r[2];return e[0]=o*t[0]+u*t[4]+a*t[8],e[1]=o*t[1]+u*t[5]+a*t[9],e[2]=o*t[2]+u*t[6]+a*t[10],e},transformNormal:function(t,r,e){e=e||new n(3);var o=u(t),a=r[0],c=r[1],i=r[2];return e[0]=a*o[0]+c*o[1]+i*o[2],e[1]=a*o[4]+c*o[5]+i*o[6],e[2]=a*o[8]+c*o[9]+i*o[10],e},setDefaultType:function(t){const r=n;return n=t,r}}});