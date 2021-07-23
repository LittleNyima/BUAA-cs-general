#include <stdio.h>

int readin(signed int xor[])
{
	int i=0;
	while(1)
	{
		scanf("%d",&xor[i]);
		i=i+1;
		if(getchar()=='\n')
			break;
	}
	while(1)
	{
		scanf("%d",&xor[i]);
		i=i+1;
		if(getchar()=='\n')
			break;
	}
	return i-1;
}

/*void mover(signed int xor[],int maxi,int i,int j)
{
	while(j<maxi)
	{
		xor[j]=xor[j+1];
		j=j+1;
	}
	while(i<maxi)
	{
		xor[i]=xor[i+1];
		i=i+1;
	}
	xor[maxi]=0;
	xor[maxi-1]=0;
}

int clear(signed int xor[],int maxi)
{
	int i=0,j=0,judge=2;
	while(i<=maxi)
	{
		j=i+1;
		while(j<=maxi)
		{
			if(xor[i]==xor[j])
			{
				mover(xor,maxi,i,j);
				maxi=maxi-2;
				judge=1;
			}
			if(judge==2)
			{
				j=j+1;
			}
			judge=2;
		}
		i=i+1;
	}
	return maxi;
}*/

void bubble_sort(int a[], int n)
{
	int i,j,temp;
	for (j=0;j<n-1;j++)
		for (i=0;i<n-1-j;i++)
		{
			if(a[i]<a[i+1])
			{
				temp=a[i];
				a[i]=a[i+1];
				a[i+1]=temp;
			}
		}
}

int isOnly(int number,int xor[],int maxi)
{
	int i=0,k=0;
	while(i<=maxi)
	{
		if(xor[i]==number)
		{
			k=k+1;
		}
		i=i+1;
	}
	if(k==1)
		return 1;
	else
		return 0;
}

int main()
{
	signed int xor[45]={0};//数集
	int i=0,j=0;//数组下标计数用
	int maxi=0;//数组最大下标
	maxi=readin(xor);//读入数据
	//maxi=clear(xor,maxi);//删除重复数据
	bubble_sort(xor,maxi+1);//冒泡法排序
	//打印
	j=0;
	while(j<=maxi)
	{
		if((isOnly(xor[j],xor,maxi))==1)
		{
			printf("%d ",xor[j]);
		}
		j=j+1;
	}
	return 0;
}
