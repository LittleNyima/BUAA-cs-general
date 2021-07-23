#include <stdio.h>
#include <string.h>
int main(int argc,char* argv[])
{
	//char program[180]={'\0'};//程序名
	//char in[100]={'\0'};//输入文件名
	//char out[100]={'\0'};//输出文件名
	char words[180][25]={'\0'};//储存单词
	char temp[25]={'\0'};//单词互换中间量
	char letter='\0';//用于fgetc
	int i=0,j=0;//计数器1
	int m=0,n=-1,p=0;//计数器2
	FILE * fin;
	FILE * fout;
	fin=fopen(argv[1],"r");
	while(1)//输入文件中的字母
	{
		while(1)
		{
			letter=fgetc(fin);
			if(letter==' '||letter=='\n'||letter==EOF)
			{
				if(words[i][0]=='\0')
				{
					i=i-1;
				}
				break;
			}
			words[i][j]=letter;
			j=j+1;
		}
		if(letter==EOF)
		{
			break;
		}
		i=i+1;
		j=0;
	}
	fclose(fin);
	while(1)
	{
		if(words[m][0]=='\0')
			break;
		m=m+1;
	}
	m=m-1;
	while(1)//删除重复单词
	{
		n=n+1;
		p=n+1;
		if(words[n][0]=='\0')
		{
			break;
		}
		while(1)
		{
			if(words[p][0]=='\0')
			{
				break;
			}
			if(strcmp(words[n],words[p])==0)
			{
				strcpy(temp,words[n]);
				strcpy(words[n],words[m]);
				strcpy(words[m],temp);
				strcpy(words[m],words[m+1]);
				m=m-1;
			}
			p=p+1;
		}
	}
	//m表示含有单词的最大words数组下标
	n=0;
	p=0;
	while(n<=m)//bubble_sort
	{
		while(p<m)
		{
			if(strcmp(words[p],words[p+1])>0)
			{
				strcpy(temp,words[p]);
				strcpy(words[p],words[p+1]);
				strcpy(words[p+1],temp);
			}
			p=p+1;
		}
		p=0;
		n=n+1;
	}
	fout=fopen(argv[2],"w");
	i=0;
	fprintf(fout,"%s",words[i]);
	i=i+1;
	while(words[i][0]!='\0')
	{
		fprintf(fout," %s",words[i]);
		i=i+1;
	}
	fclose(fout);
	return 0;
}
