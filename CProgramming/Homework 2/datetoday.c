#include <stdio.h>
int main()
{
	int a,b,c,d;
	scanf("%d %d %d",&a,&b,&c);
	if (a%4==0){
		if (b==1) d=c;
		else if (b==2) d=c+31;
		else if (b==3) d=c+60;
		else if (b==4) d=c+91;
		else if (b==5) d=c+121;
		else if (b==6) d=c+152;
		else if (b==7) d=c+182;
		else if (b==8) d=c+213;
		else if (b==9) d=c+244;
		else if (b==10) d=c+274;
		else if (b==11) d=c+305;
		else d=c+335;}
	else{
		if (b==1) d=c;
		else if (b==2) d=c+31;
		else if (b==3) d=c+59;
		else if (b==4) d=c+90;
		else if (b==5) d=c+120;
		else if (b==6) d=c+151;
		else if (b==7) d=c+181;
		else if (b==8) d=c+212;
		else if (b==9) d=c+243;
		else if (b==10) d=c+273;
		else if (b==11) d=c+304;
		else d=c+334;}
	printf("%d",d);
	return 0;
}
