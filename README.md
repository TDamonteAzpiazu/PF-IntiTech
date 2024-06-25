# Hola gente, que ondas?
## Si no entienden como se usa el github, les dejo una serie de pasos

## 1. En la terminal ponen:
```shell
git checkout funcionalidad
```
Ejemplo: git checkout login

Esto es para moverse entre distintas ramas

Si necesitan crear una rama nueva hacemos
```shell
git checkout -b funcionalidad
#creamos la rama nueva con ese nombre de funcionalidad en tu computadora

git push origin funcionalidad
#la crea tambien en github 
```

## 2. Aca agarran la pala y hacen el codigo que tengan q hacer

## 3. Momento de pushear
```shell
#si no estas en la rama de la funcionalidad
git checkout funcionalidad
#si ya estabas, vas directo a esto
git add .
git commit -m "Descripcion de los cambios muy descriptiva por favor"
git push origin funcionalidad
```

## 4. Hacer el pull request a dev:

Una vez que un miembro del equipo ha terminado una funcionalidad o un conjunto de cambios, debe crear una Pull Request (PR):
* Ir a la página del repositorio en GitHub.
* Hacer clic en "Compare & pull request".
* Seleccionar dev como la rama base y la rama de funcionalidad como la rama de comparación.
* Añadir una descripción.

Otro miembro del equipo revisa la PR, y una vez aprobada, se puede mergear a dev.

## 5. Si otro compañero hizo un merge a dev y nuestro VSCode quedó desactualizado:
```shell
git pull origin dev
```
Esto nos actualiza nuestro Visual a la version actual de dev