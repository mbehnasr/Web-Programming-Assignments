package main

import (
	"bufio"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
)

func main() {
	http.HandleFunc("/", HelloServer)
	http.HandleFunc("/sha256", SHA256)
	http.HandleFunc("/write", write)
	http.HandleFunc("/test", test)
	_ = http.ListenAndServe(":8080", nil)
}

func test(w http.ResponseWriter, r *http.Request) {
	_, _ = fmt.Fprintf(w, "RequetURI=%s\n", r.RequestURI)
	_, _ = fmt.Fprintf(w, "Header=%s\n", r.Header)
	_, _ = fmt.Fprintf(w, "Body=%s\n", r.Body)
	_, _ = fmt.Fprintf(w, "Form=%s\n", r.Form)
	_, _ = fmt.Fprintf(w, "Method=%s\n", r.Method)
	_, _ = fmt.Fprintf(w, "host=%s\n", r.Host)
	_, _ = fmt.Fprintf(w, "PostForm=%s\n", r.PostForm)
	_, _ = fmt.Fprintf(w, "URL=%s\n", r.URL)
	_, _ = fmt.Fprintf(w, "ParseForm=%s\n", r.ParseForm())
	_, _ = fmt.Fprintf(w, "RemoteAddress=%s\n", r.RemoteAddr)
}

func HelloServer(w http.ResponseWriter, r *http.Request) {
	_, _ = fmt.Fprintf(w, "Hello Server, %s!", r.URL.Path[1:])
}


func readIthLine(i int) (line string, err error) {
	file, _ := os.Open("../file.txt")
	fileScanner := bufio.NewScanner(file)
	lineCount := 0
	for fileScanner.Scan() {
		lineCount++
		if lineCount == i {
			return fileScanner.Text(), fileScanner.Err()
		}
	}
	return "", io.EOF
}

func write(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		_, _ = fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}
	for k, v := range r.URL.Query() {
		fmt.Printf("%s: %s\n", k, v)
	}
	lineNumber, err := strconv.Atoi(r.FormValue("write"))
	if err != nil {
		_, _ = fmt.Fprintf(w, "please enter a number: %v", err)
		return
	}
	if lineNumber <= 0 || lineNumber > 100 {
		_, _ = fmt.Fprintf(w, "please enter a number from 1 to 100 %v", err)
		return
	}
	line, err := readIthLine(lineNumber)
	_, _ = fmt.Fprintf(w, "%s", line)
}

func SHA256(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		_, _ = fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}
	x, err := strconv.Atoi(r.FormValue("firstNumber"))
	if err != nil {
		_, _ = fmt.Fprintf(w, "please enter two number!: %v", err)
		return
	}
	y, err := strconv.Atoi(r.FormValue("secondNumber"))
	if err != nil {
		_, _ = fmt.Fprintf(w, "please enter two numbers!: %v", err)
		return
	}
	sum := x + y
	sumInString := strconv.Itoa(sum)
	h := sha256.New()
	h.Write([]byte(sumInString))
	sha256Hash := hex.EncodeToString(h.Sum(nil))
	fmt.Println(sha256Hash)
	enc := json.NewEncoder(w)
	d := map[string]string{"result": sha256Hash}
	_ = enc.Encode(d)
}
