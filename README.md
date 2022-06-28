# COMO EJECUTAR BOTS

## ABRIR CLOUD SHELL:

[https://shell.cloud.google.com/](https://shell.cloud.google.com/)

## (1ra vez) EN EL TERMINAL CLONAR EL REPOSITORIO [1 sola vez]:
```sh 
git clone https://github.com/EBombo/puppeteer-ebombo-e2e-tests.git
```

## EJECUTAR:
### (1ra vez) :
```sh
cd puppeteer-ebombo-e2e-tests && npm install
```

### 2da vez en adelante:
```sh
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
```

```sh
sudo apt install ./google-chrome-stable_current_amd64.deb
```

```sh
cd puppeteer-ebombo-e2e-tests
```

## EJECUTAR: 
```sh
PIN=XXXXXX npm run test
```

```sh
PIN=XXXXXX ENV=prod npm run test-5
```

### ------------------------------
### Donde "test" ejecutara 1 bots.
### Donde "PIN" es el pin de ingreso al juego.
### Donde "ENV" es el entorno a ejecutar los bots [prod || dev].
### Si no esta definido por defecto ser el entorno de Development

### PROD: ebombo.io
### DEV: red.ebombo.io
### ------------------------------

# Bots: 
```sh
test-5
```

```sh
test-10
```

```sh
test-30
```

```sh
test-60
```

```sh
test-100
```

```sh
test-300
```

```sh
test-800
```

```sh
test-1200
```

```sh
test-2000
```

```sh
test-3000
```

```sh
test-4000
``` 








### References:
https://www.npmjs.com/package/puppeteer-loadtest
https://github.com/puppeteer/puppeteer/blob/v14.4.1/docs/api.md#pagewaitforselectorselector-options
