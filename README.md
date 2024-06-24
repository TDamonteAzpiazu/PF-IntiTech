# Hola gente, que ondas?
## Si no entienden como se usa el github, les dejo una serie de pasos

## 1. En la terminal ponen:
```shell
git checkout sunombre
```
Ejemplo: git checkout tobo

Sus nombres aparecen asi: 

tobo, maxi, pablo, benja, bruno, lucas, santi

Si lo escriben distinto a eso mueren

## 2. Aca agarran la pala y hacen el codigo que tengan q hacer

## 3. Momento de pushear
```shell
git add .
git commit -m "Descripcion de los cambios"
git push origin sunombre
```

## 4. Hacer el pull request a dev:

Una vez que un miembro del equipo ha terminado una funcionalidad o un conjunto de cambios, debe crear una Pull Request (PR) desde su rama personal a dev:
* Ir a la página del repositorio en GitHub.
* Hacer clic en "Compare & pull request".
* Seleccionar dev como la rama base y su rama personal como la rama de comparación.
* Añadir una descripción y asignar revisores.

Otro miembro del equipo revisa la PR, y una vez aprobada, se puede fusionar en dev.

## 5. Hacer Pull Request de dev a main

Cuando dev tiene una versión estable y probada, se debe crear una PR desde dev a main.
* Ir a la página del repositorio en GitHub.
* Hacer clic en "Compare & pull request".
* Seleccionar main como la rama base y dev como la rama de comparación.
* Añadir una descripción y asignar revisores.

Otro miembro del equipo revisa la PR, y una vez aprobada, se puede fusionar en main.