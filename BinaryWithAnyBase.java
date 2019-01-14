import java.util.Scanner;

public class BinaryWithAnyBase{
public static void main(String[] args){
	Scanner in = new Scanner(System.in);
	long a = in.nextLong();
	int b = in.nextInt();

	int arr[] = getDigits(a,b);
	for(int i = 0; i<arr.length;i++){
		System.out.print(arr[i] + " ");
	}

}

public static int[] getDigits(long N, long b){
	int power = 0;
	while(Math.pow(b, power) <= N){
		power++;
	}

	int result[] = new int[power];
	while(N>0 && power>0){
		power--;int c = 0;
		while(c*Math.pow(b,power)<=N){
			c++;
		}
		c--;
		N = (int)(N-(c*Math.pow(b, power)));
		result[power] = c;		
	}
	return result;
}

}
