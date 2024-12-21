### Problème et Difficultés Rencontrées

#### Backend
- La méthode `save` de **TaskRepository** ne prenait pas en charge les données transmises via `[create(SaveTaskUseCase).handle(dto)]`. Il était nécessaire de spécifier explicitement le type **TaskCreateInput** pour assurer son bon fonctionnement :  
  ```typescript
  return this.prisma.task.create({data: {...data as Prisma.TaskCreateInput, createdAt: new Date()}});
  ```
- Impossibilité d’intégrer **SaveTaskUseCase** dans le contrôleur en raison de l'absence du type attendu. Il a fallu ajouter le type correspondant dans **UseCaseFactory** :  
  ```typescript
  type UseCases = GetAllTasksUseCase | DeleteTask | SaveTaskUseCase;
  ```

#### Frontend
- J’ai introduit ce hook sous forme d’objet pour optimiser l’espace et accélérer le développement :  
  ```typescript
  const [taskData, setTaskData] = useState<Task>({
    id: -1,
    name: "",
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  });
  ```
- La fonction `handleDisplay` a été mise en place pour remplir les données d’une tâche lorsqu’on clique sur l’icône **pen** d’édition.
- Un petit hook a été créé pour recharger les données après chaque ajout, modification ou suppression :  
  ```typescript
  const [refetch, setRefetch] = useState(0);
  ```
  Cette approche évite de rafraîchir entièrement la page à chaque mise à jour, préservant ainsi les performances.
- `resetValue()`, une fonction simple, permet de réinitialiser l’objet **task**, entre autres.

---

### Bonus
- Ajout d’un second paramètre dans la méthode **map** pour assurer une identification unique de chaque tâche.
- Validation des tâches implémentée à la fois côté serveur et côté client. Bien qu'il reste possible d'améliorer le code, je me suis arrêté à ce stade.
- Intégration d’un champ **input** permettant d’ajouter une tâche de manière intuitive, une fonctionnalité que j’ai trouvée particulièrement intéressante.
- Ajout de petites améliorations UX, telles que le changement de couleur du texte lors d'une action, afin d'offrir une expérience utilisateur plus agréable.
etc.