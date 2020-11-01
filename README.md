WebProgramming



nodejs

run npm install in nodejs directory to install requirements
go

run go build sha256.go in go directory
locust

after installing locust using pip3 install locust, run locust command in the project locust folder. Then go to 127.0.0.1:8089 and start testing!

Review and compare the results and RPS obtained for 4 different operations:

If we consider the number of users to be 10000 and the spawn rate equal to 1000, the number of failed tasks will increase to about 30% due to the load imposed on the server, and the RPS of all these commands will be around 125. However, in this case, for sha256 command with nodejs and write using go, this value will be about 130 By reducing the number of users to 1000 and spawn rate to 100, the problem of failing the tests will be solved (failed task will be almost 1%), and in the end, the RPS will be about 145, which is more for commands that use GET than commands with POST and for the sha256 operation in nodejs will ne about 144 and for go will be about 142. This means that nodejs operations are a bit faster because their average response time is 101ms for both opearation which is 106ms for write and 109ms for sha256 operations in go.