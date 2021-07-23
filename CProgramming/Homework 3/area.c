#include <stdio.h>
#include <math.h>

int max(int a,int b)
{
	if (a>=b)
		return a;
	else
		return b;
}

int min(int a,int b)
{
	if (a<=b)
		return a;
	else
		return b;
}

int main()
{
	int ax1,ay1,ax2,ay2,bx1,by1,bx2,by2,p1,p2,area,temp;
	scanf("%d %d %d %d",&ax1,&ay1,&ax2,&ay2);
	scanf("%d %d %d %d",&bx1,&by1,&bx2,&by2);
	if(ax1>ax2){
		temp=ax2;
		ax2=ax1;
		ax1=temp;
	}
	if(ay1>ay2){
		temp=ay2;
		ay2=ay1;
		ay1=temp;
	}
	if(bx1>bx2){
		temp=bx2;
		bx2=bx1;
		bx1=temp;
	}
	if(by1>by2){
		temp=by2;
		by2=by1;
		by1=temp;
	}
	p1=min(ax2,bx2)-max(ax1,bx1);
	p2=min(ay2,by2)-max(ay1,by1);
	if((p1>0)&&(p2>0))
		area=p1*p2;
	else area=0;
	printf("%d",area);
	return 0;
}

