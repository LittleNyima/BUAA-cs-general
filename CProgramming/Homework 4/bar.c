#include <stdio.h>
int main()
{
	int a=0,b=0,c=0,d=0,e=0,f=0,g=0;
	int h=0,i=0,j=0,k=0,l=0,m=0,n=0;
	int o=0,p=0,q=0,r=0,s=0,t=0;
	int u=0,v=0,w=0,x=0,y=0,z=0;
	int cct,asc,max=0;
	cct=getchar();
	asc=cct-96;
	while(cct!=EOF)
	{
		if(asc==1) a=a+1;
		else if(asc==2) b=b+1;
		else if(asc==3) c=c+1;
		else if(asc==4) d=d+1;
		else if(asc==5) e=e+1;
		else if(asc==6) f=f+1;
		else if(asc==7) g=g+1;
		else if(asc==8) h=h+1;
		else if(asc==9) i=i+1;
		else if(asc==10) j=j+1;
		else if(asc==11) k=k+1;
		else if(asc==12) l=l+1;
		else if(asc==13) m=m+1;
		else if(asc==14) n=n+1;
		else if(asc==15) o=o+1;
		else if(asc==16) p=p+1;
		else if(asc==17) q=q+1;
		else if(asc==18) r=r+1;
		else if(asc==19) s=s+1;
		else if(asc==20) t=t+1;
		else if(asc==21) u=u+1;
		else if(asc==22) v=v+1;
		else if(asc==23) w=w+1;
		else if(asc==24) x=x+1;
		else if(asc==25) y=y+1;
		else if(asc==26) z=z+1;
		cct=getchar();
		asc=cct-96;
	}
	if(a>=max) max=a;
	if(b>=max) max=b;
	if(c>=max) max=c;
	if(d>=max) max=d;
	if(e>=max) max=e;
	if(f>=max) max=f;
	if(g>=max) max=g;
	if(h>=max) max=h;
	if(i>=max) max=i;
	if(j>=max) max=j;
	if(k>=max) max=k;
	if(l>=max) max=l;
	if(m>=max) max=m;
	if(n>=max) max=n;
	if(o>=max) max=o;
	if(p>=max) max=p;
	if(q>=max) max=q;
	if(r>=max) max=r;
	if(s>=max) max=s;
	if(t>=max) max=t;
	if(u>=max) max=u;
	if(v>=max) max=v;
	if(w>=max) max=w;
	if(x>=max) max=x;
	if(y>=max) max=y;
	if(z>=max) max=z;
	while (max>0)
	{
		if(max>a) printf(" ");
		else printf("*");
		if(max>b) printf(" ");
		else printf("*");
		if(max>c) printf(" ");
		else printf("*");
		if(max>d) printf(" ");
		else printf("*");
		if(max>e) printf(" ");
		else printf("*");
		if(max>f) printf(" ");
		else printf("*");
		if(max>g) printf(" ");
		else printf("*");
		if(max>h) printf(" ");
		else printf("*");
		if(max>i) printf(" ");
		else printf("*");
		if(max>j) printf(" ");
		else printf("*");
		if(max>k) printf(" ");
		else printf("*");
		if(max>l) printf(" ");
		else printf("*");
		if(max>m) printf(" ");
		else printf("*");
		if(max>n) printf(" ");
		else printf("*");
		if(max>o) printf(" ");
		else printf("*");
		if(max>p) printf(" ");
		else printf("*");
		if(max>q) printf(" ");
		else printf("*");
		if(max>r) printf(" ");
		else printf("*");
		if(max>s) printf(" ");
		else printf("*");
		if(max>t) printf(" ");
		else printf("*");
		if(max>u) printf(" ");
		else printf("*");
		if(max>v) printf(" ");
		else printf("*");
		if(max>w) printf(" ");
		else printf("*");
		if(max>x) printf(" ");
		else printf("*");
		if(max>y) printf(" ");
		else printf("*");
		if(max>z) printf(" \n");
		else printf("*\n");
		max=max-1;
	}
	printf("abcdefghijklmnopqrstuvwxyz");
	return 0;
}
