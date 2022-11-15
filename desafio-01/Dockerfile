FROM golang:alpine as builder

WORKDIR /rocks

RUN go env -w GO111MODULE=off

COPY ./rocks.go .

RUN go build -o rocks

FROM scratch

COPY --from=builder /rocks .

CMD ["./rocks"]