#include <stdio.h>
int main()
{
	int data1=0,data2=0,a1=0;
	char op;
	double a=0;
	scanf("%d %d %c",&data1,&data2,&op);
	if (op=='+'){
		a1=data1+data2;
		printf("%d",a1);
	}
	else if (op=='-'){
		a1=data1-data2;
		printf("%d",a1);
	}
	else if (op=='*'){
		a1=data1*data2;
		printf("%d",a1);
	}
	else if (op=='/'){
		if (data1%data2==0){
			a1=data1/data2;
			printf("%d",a1);
		}
		else{
			a=(double)data1/(double)data2;
			printf("%.2f",a);
		}
	}
	return 0;
}

