import java.awt.Color;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.Point;
import java.awt.Rectangle;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.LineBorder;

public class Mowing {
	private char[][] lawn;
	private int x, y, w, l, counter = 0;
	private ArrayList<Point> list;
	private GridBagConstraints layout;
	private JLabel[][] grid;

	public Mowing() throws FileNotFoundException {
		list = new ArrayList<Point>();
		FileReader fr = new FileReader("mowInput.txt");
		Scanner a = new Scanner(fr);
		l = a.nextInt();
		w = a.nextInt();
		lawn = new char[l][w];
		System.out.println("Dimensions: " + l + ", " + w);
		x = a.nextInt();
		y = a.nextInt();
		a.nextLine();
		System.out.println("Starting pos: (" + x + ", " + y + ")");
		for (int i = 0; i < l; i++) {
			String s = a.nextLine().replace(" ", "");
			for (int j = 0; j < w; j++) {
				lawn[i][j] = s.charAt(j);
			}
		}

		JFrame frame = new JFrame("lawn");
		JPanel jp = new JPanel();
		// frame.setSize(400, 400);
		frame.setVisible(true);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setBackground(new Color(100, 100, 255));
		jp.setLayout(new GridBagLayout());
		layout = new GridBagConstraints();
		layout.insets = new Insets(0, 0, l, w);
		grid = new JLabel[l][w];

		for (int i = 0; i < l; i++) {
			for (int j = 0; j < w; j++) {
				layout.gridy = i;
				layout.gridx = j;
				JLabel jl;
				if (lawn[i][j] == '.') {
					jl = new JLabel("   ");
				} else {
					jl = new JLabel("   ");
				}
				jl.setOpaque(true);
				if (lawn[i][j] == 'T') {
					jl.setBackground(Color.black);
				} else if (lawn[i][j] == 'C') {
					jl.setBackground(Color.green);
				} else
					jl.setBackground(Color.blue);
				grid[i][j] = jl;
				jp.add(jl, layout);

			}
		}

		frame.add(jp);
		frame.pack();

		play();

	}

	public void play() {
		list.add(new Point(x, y));
		printLawn();
		while (list.size() != 0) {
			for (int please = 0; please < list.size(); please++) {
				Point p = list.get(please);
				if (isClear((int) p.getX(), (int) p.getY())) {
					for (int row = -1; row <= 1; row++) {
						for (int col = -1; col <= 1; col++) {
							if (lawn[(int) p.getX() + row][(int) p.getY() + col] != 'C') {
								// printLawn();
								list.add(new Point((int) p.getX() + row, (int) p.getY() + col));
								lawn[(int) p.getX() + row][(int) p.getY() + col] = 'C';
								grid[(int) p.getX() + row][(int) p.getY() + col].setBackground(Color.green);
								TimeUnit name = TimeUnit.MILLISECONDS;
								try {
									name.sleep(20);
								} catch (InterruptedException e) {
									e.printStackTrace();
								}
							}
						}
					}
				}
				list.remove(please);
			}
			// System.out.println("List size: " + list.size());
		}
		System.out.println("Counter: " + counter);

	}

	public void printLawn() {
		for (int i = 0; i < l; i++) {
			for (int j = 0; j < w; j++) {
				// System.out.println("x : " + i + " y: " +j);
				System.out.print(lawn[i][j] + " ");
			}
			System.out.println();
		}
		System.out.println();
		System.out.println();
		System.out.println();

	}

	public boolean isClear(int x1, int y1) {
		counter++;
		if (x1 < l - 1 && y1 < w - 1 && x1 > 0 && y1 > 0) {
			if (lawn[x1][y1] != 'T' && lawn[x1 - 1][y1 - 1] != 'T' && lawn[x1 - 1][y1] != 'T'
					&& lawn[x1 + 1][y1 - 1] != 'T' && lawn[x1 - 1][y1 + 1] != 'T' && lawn[x1 + 1][y1 + 1] != 'T'
					&& lawn[x1 + 1][y1] != 'T' && lawn[x1][y1 + 1] != 'T' && lawn[x1 - 1][y1] != 'T'
					&& lawn[x1][y1 - 1] != 'T') {
				return true;
			} else {
				return false;
			}

		} else
			return false;
	}

	public static void main(String[] args) throws FileNotFoundException {
		Mowing m = new Mowing();
		// System.out.println("Program over");
	}
}