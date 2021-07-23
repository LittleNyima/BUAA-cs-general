#include <stdio.h>
#include <math.h>
int main()
{
	//海伦公式：S=(P(P-A)(P-B)(P-C))^1/2
	//平方根sqrt
	int num=0,i=0;//点数量
	double x[15]={0};//x坐标
	double y[15]={0};//y坐标
	double length0i[14]={0};
	double lengthiip[13]={0};
	double sum=0,p=0;
	scanf("%d",&num);
	while(i<num)//读入
	{
		scanf("%lf",&x[i]);
		scanf("%lf",&y[i]);
		i=i+1;
	}
	i=1;
	while(i<num)//第一个点与其余每个点连线长度
	{
		length0i[i-1]=sqrt((x[0]-x[i])*(x[0]-x[i])+(y[0]-y[i])*(y[0]-y[i]));
		i=i+1;
	}
	i=1;
	while(i+1<num)//其余各点相邻连线长度
	{
		lengthiip[i-1]=sqrt((x[i]-x[i+1])*(x[i]-x[i+1])+(y[i]-y[i+1])*(y[i]-y[i+1]));
		i=i+1;
	}
	i=0;
	while(i+2<num)
	{
		p=(length0i[i]+lengthiip[i]+length0i[i+1])/2;
		sum=sum+sqrt(p*(p-length0i[i])*(p-lengthiip[i])*(p-length0i[i+1]));
		i=i+1;
	}
	printf("%.2lf\n",sum);
	return 0;
}
