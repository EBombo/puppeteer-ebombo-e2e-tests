# COMO EJECUTAR BOTS

## ABRIR CLOUD SHELL:

[https://shell.cloud.google.com/](https://shell.cloud.google.com/)

## (1ra vez) EN EL TERMINAL CLONAR EL REPOSITORIO [1 sola vez]:
```git clone https://github.com/EBombo/puppeteer-ebombo-e2e-tests.git```

## EJECUTAR:
### (1ra vez) :
```cd puppeteer-ebombo-e2e-tests && npm install```

### 2da vez en adelante:
```wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb```

```sudo apt install ./google-chrome-stable_current_amd64.deb```

```cd puppeteer-ebombo-e2e-tests```

## EJECUTAR: 
```PIN=XXXXXX npm run test```

```PIN=XXXXXX ENV=prod npm run test-5```

### ------------------------------
### Donde "test" ejecutara 1 bots.
### Donde "PIN" es el pin de ingreso al juego.
### Donde "ENV" es el entorno a ejecutar los bots [prod || dev].
### Si no esta definido por defecto ser el entorno de Development

### PROD: ebombo.io
### DEV: red.ebombo.io
### ------------------------------

# Bots: 
```test-5```

```test-10```

```test-30```

```test-60```

```test-100```

```test-300```

```test-800```

```test-1200```

```test-2000```

```test-3000```

```test-4000``` 








### References:
https://www.npmjs.com/package/puppeteer-loadtest
https://github.com/puppeteer/puppeteer/blob/v14.4.1/docs/api.md#pagewaitforselectorselector-options
