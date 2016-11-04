import java.net.Socket;
import java.net.ServerSocket;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class SingleSocketServer {
  private byte[] buf = new byte[16384];
  private String bufString = null;
  private int previousRead = 0;

  private void clearBuffer() {
    int i = 0;
    while (buf[i] != 0 && i < 16384) {
      buf[i] = 0;
      i++;
    }
  }

  void run() {
    try {
      // create socket
      int port = 4444;
      ServerSocket serverSocket = new ServerSocket(port);
      System.err.printf("Started server on port %d\n", port);

      // a "blocking" call which waits until a connection is requested
      Socket clientSocket = serverSocket.accept();
      System.err.println("Accepted connection from client");

      InputStream is = clientSocket.getInputStream();
      OutputStream os = clientSocket.getOutputStream();
      
      os.write("Hello, dear Client".getBytes());
      os.flush();
      while (true) {
        // try read (maybe discover closed)
        clearBuffer();
        previousRead = is.read(this.buf);

        // exit when stream is closed from client
        if (previousRead == -1) {
          break;
        }
        System.out.printf("Read bytes (previousRead): %d\n", previousRead);

        // when something is read, assemble, wait, and respond.             
        bufString = new String(buf, 0, previousRead);
        System.out.printf("Client's request: (%d) %s\n", bufString.length(), bufString);
        Thread.sleep(1000);
        System.out.println("Waking (simulated work)");
        os.write(bufString.getBytes());
        os.flush();
      }
      
    } catch (IOException e) {
      
    } catch (Exception e) {
      // interrupted
    }

    // close IO streams, then socket
    /*System.err.println("Closing connection with client");
    clientSocket.close();*/
  }

  public static void main(String[] args) throws Exception {
    (new SingleSocketServer()).run();
  }
}
