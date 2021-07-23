#include <stdio.h>
int main()
{
	signed int num[100]={0};//运算对象
	char op[100];//运算符
	int i=0,j=0;//写入位置、运算位置
	int in=0;//结果储存位置
	scanf("%d",&num[i]);//读入所有运算对象与运算符
	op[i]=getchar();
	while(op[i]==' ')
	{
		op[i]=getchar();
	}
	while(op[i]!='=')
	{
		i=i+1;
		scanf("%d",&num[i]);
		op[i]=getchar();
		while(op[i]==' ')
		{
			op[i]=getchar();
		}
	}
	op[i+1]='@';
	while(op[j]!='=')//将所有减号并入数字
	{
		if(op[j]=='-')
		{
			num[j+1]=num[j+1]*(-1);
			op[j]='+';
		}
		j=j+1;
	}
	j=0;
	while(op[j]!='=')//完成所有乘除法运算
	{
		if(op[j]=='*'||op[j]=='/')
		{
			if(op[j]=='*')
			{
				num[j+1]=num[j]*num[j+1];
			}
			if(op[j]=='/')
			{
				num[j+1]=num[j]/num[j+1];
			}
		}
		j=j+1;
	}
	j=0;
	while(op[j]!='@')//完成加减法运算
	{
		if(op[j]=='+'||op[j]=='=')
		{
			in=in+num[j];
		}
		j=j+1;
	}
	printf("%d\n",in);
	return 0;
}
