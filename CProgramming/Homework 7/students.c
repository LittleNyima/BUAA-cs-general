#include <stdio.h>
#include <string.h>
/*struct students
{
	int index;
	char name[7];
	int age;
};*/

void sortByName(int index[],char name[][7],int age[],int number)
{
	int compare=2;
	int i=0,j=0,ntemp=0;
	char ctemp[7]={'\0'};
	for (j=0;j<number-1;j++)
	{
		for (i=0;i<number-1-j;i++)
		{
			compare=strcmp(name[i],name[i+1]);
            if(compare>0)
			{
				ntemp=index[i];
				index[i]=index[i+1];
				index[i+1]=ntemp;
				ntemp=age[i];
				age[i]=age[i+1];
				age[i+1]=ntemp;
				strcpy(ctemp,name[i]);
				strcpy(name[i],name[i+1]);
				strcpy(name[i+1],ctemp);
			}
		}
	}
}

void sortByAge(int index[],char name[][7],int age[],int number)
{
	int i=0,j=0,ntemp=0;
	char ctemp[7]={'\0'};
	for (j=0;j<number-1;j++)
	{
		for (i=0;i<number-1-j;i++)
		{
            if(age[i]>age[i+1])
			{
				ntemp=index[i];
				index[i]=index[i+1];
				index[i+1]=ntemp;
				ntemp=age[i];
				age[i]=age[i+1];
				age[i+1]=ntemp;
				strcpy(ctemp,name[i]);
				strcpy(name[i],name[i+1]);
				strcpy(name[i+1],ctemp);
			}
		}
	}
}

void moveRight(char name[][7],int number)
{
	int i=0;
	int j=5;
	int maxi[52]={0};
	char temp='\0';
	while(i<number)
	{
		while(name[i][j]=='\0')
		{
			name[i][j]=' ';
			j=j-1;
			maxi[i]=j;
		}
		j=5;
		i=i+1;
	}
	i=0;
	j=5;
	while(i<number)
	{
		while(maxi[i]>=0)
		{
			temp=name[i][maxi[i]];
			name[i][maxi[i]]=name[i][j];
			name[i][j]=temp;
			j=j-1;
			maxi[i]=maxi[i]-1;
		}
		i=i+1;
		j=5;
	}
}

void print(int index[],char name[][7],int age[],int number)
{
	int i=0;
	while(i<number)
	{
		printf("%3d%s%3d\n",index[i],name[i],age[i]);
		i=i+1;
	}
}

int main()
{
	int number=0;
	int i=0,j=0;
	int index[52]={0};
	char name[52][7]={'\0'};
	int age[52]={0};
	char temp='\0';
	scanf("%d",&number);
	//读入数据
	while(i<number)
	{
		scanf("%d",&index[i]);
		temp=getchar();
		while(temp==' ')
		{
			temp=getchar();
		}
		while(temp!=' ')
		{
			name[i][j]=temp;
			j=j+1;
			temp=getchar();
		}
		j=0;
		scanf("%d",&age[i]);
		i=i+1;
	}
	//按姓名升序排序
	sortByName(index,name,age,number);
	//向右对齐
	moveRight(name,number);
	//print
	print(index,name,age,number);
	//按年龄升序排序
	sortByAge(index,name,age,number);
	//print
	printf("\n");
	print(index,name,age,number);
	return 0;
}


