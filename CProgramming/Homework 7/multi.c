#include <stdio.h>

void readin(int multix[][2])
{
	char ch=' ';
	int i=0;
	while(1)
	{
		if(ch=='\n')
			break;
		scanf("%d",&multix[i][0]);
		scanf("%d",&multix[i][1]);
		ch=getchar();
		i=i+1;
	}
}

void multiply(int result[][2],int multi1[][2],int multi2[][2])
{
	int i=0;
	int j=0;
	int r=0;
	while(1)
	{
		if(multi1[i][0]==0&&multi1[i][1]==0)
			break;
		while(1)
		{
			if(multi2[j][0]==0&&multi2[j][1]==0)
				break;
			result[r][0]=multi1[i][0]*multi2[j][0];
			result[r][1]=multi1[i][1]+multi2[j][1];
			r=r+1;
			j=j+1;
		}
		i=i+1;
		j=0;
	}
}

void sorter(int result[][2])
{
	int i=0;
	int j=0;
	int temp=0;
	while(1)
	{
		if(i>0&&result[i-1][0]==0&&result[i-1][1]==0)
			break;
		while(1)
		{
			if(result[j][0]==0&&result[j][1]==0)
				break;
			if(result[j][1]<result[j+1][1])
			{
				temp=result[j][0];
				result[j][0]=result[j+1][0];
				result[j+1][0]=temp;
				temp=result[j][1];
				result[j][1]=result[j+1][1];
				result[j+1][1]=temp;
			}
			j=j+1;
		}
		i=i+1;
		j=0;
	}
}

int iswithin(int x,int put[][2])
{
	int i=0;
	while(i<2500)
	{
		if(x==put[i][1])
			return i;
		i=i+1;
	}
	return -1;
}

void add(int result[][2],int put[][2])
{
	int i=0,j=0;
	int k=0;
	while(1)
	{
		if(result[i][0]==0&&result[i][1]==0)
			break;
		k=iswithin(result[i][1],put);
		if(k==-1)
		{
			put[j][0]=put[j][0]+result[i][0];
			put[j][1]=result[i][1];
			j=j+1;
		}
		else
		{
			put[k][0]=put[k][0]+result[i][0];
		}
		i=i+1;
	}
}

void print(int result[][2])
{
	int i=0;
	while(1)
	{
		if(result[i][0]==0&&result[i][1]==0)
			break;
		printf("%d %d ",result[i][0],result[i][1]);
		i=i+1;
	}
	printf("\n");
}

int main()
{
	int result[2500][2]={0};
	int put[2500][2]={0};
	int multi1[50][2]={0};
	int multi2[50][2]={0};
	
	readin(multi1);
	readin(multi2);

	multiply(result,multi1,multi2);

	sorter(result);
	add(result,put);
	//sorter(result);

	print(put);

	return 0;
}


