#include <stdio.h>
#include <string.h>

int isNeg(char num[])//判断是否为负数
{
	if(num[0]=='-')
		return 1;//是负数
	else
		return 0;//不是负数
}

int isFloat(char num[])//判断是否为小数
{
	int n=0;
	while(num[n]!='\0')
	{
		if(num[n]=='.')
		{
			while(num[n]!='\0')
			{
				if(num[n]>='1'&&num[0]<='9')
					return 1;//是小数
				n=n+1;
			}
		}
		else
			n=n+1;
	}
	return 0;//不是小数
}

int intLen(char num[],char ent[])//整数部分有效位数
{
	int n=0,len=0;
	if(num[n]=='+'||num[n]=='-')
		n=n+1;
	while(num[n]=='0')
	{
		n=n+1;
	}
	while(num[n]>='0'&&num[n]<='9')
	{
		ent[len]=num[n];
		n=n+1;
		len=len+1;
	}
	return len;//整数部分位数
}

int fltLen(char num[],char fla[])//小数部分有效位数且去掉尾端的0，倒序
{
	int flt=99,lens=0,len=0;
	flt=isFloat(num);
	lens=strlen(num)-1;
	if(flt==0)
		return 0;
	else
	{
		while(num[lens]=='0')
		{
			num[lens]='\0';
			lens=lens-1;
		}
		while(num[lens]>='0'&&num[lens]<='9')
		{
			fla[len]=num[lens];
			lens=lens-1;
			len=len+1;
		}
	}
	return len;//小数部分有效位数
}

int formerZro(char num[])//判断小数部分前端0个数
{
	int len=0,flt=99,i=0;
	flt=isFloat(num);
	if(flt==0)
	{
		return 0;
	}
	else
	{
		while(num[i]!='.')
		{
			i=i+1;
		}
		i=i+1;
		while(num[i]=='0')
		{
			len=len+1;
			i=i+1;
		}
	}
	return len;
}

int main()
{
	char num[120]={'\0'};//原始数字
	char ent[120]={'\0'};//整数部分，无整数部分为空
	char fla[120]={'\0'};//小数部分，无小数部分为空
	int neg=99,flt=99,entlen=0,flalen=0,foZro=0,flaprt=0,entprt=0;
	gets(num);
	neg=isNeg(num);
	flt=isFloat(num);
	entlen=intLen(num,ent);
	flalen=fltLen(num,fla);
	foZro=formerZro(num);
	flaprt=flalen;
	if(neg==1)//打印负号
	{
		printf("-");
	}
	if(entlen==0&&flalen==0)//为零的情况
	{
		printf("0e0\n");
	}
	else if(entlen==0&&flalen!=0)//纯小数情况
	{
		flaprt=flaprt-foZro-1;
		if(flaprt==0)
		{
			printf("%c",fla[flaprt]);
			printf("e-%d\n",flalen);
		}
		else
		{
			printf("%c.",fla[flaprt]);
			flaprt=flaprt-1;
			while(flaprt>=0)
			{
				printf("%c",fla[flaprt]);
				flaprt=flaprt-1;
			}
			printf("e-%d\n",foZro+1);
		}
	}
	else if(entlen!=0&&flalen==0)//纯整数情况
	{
		if(entlen==1)
		{
			printf("%ce0\n",ent[entprt]);
		}
		else
		{
			printf("%c.",ent[entprt]);
			entprt=entprt+1;
			while(entprt<entlen)
			{
				printf("%c",ent[entprt]);
				entprt=entprt+1;
			}
			printf("e%d\n",entlen-1);
		}
	}
	else//混合数情况
	{
		printf("%c.",ent[entprt]);
		entprt=entprt+1;
		while(entprt<entlen)
		{
			printf("%c",ent[entprt]);
			entprt=entprt+1;
		}
		flaprt=flaprt-foZro-1;
		while(flaprt>=0)
		{
			printf("%c",fla[flaprt]);
			flaprt=flaprt-1;
		}
		printf("e%d\n",entlen-1);
	}
	return 0;
}
