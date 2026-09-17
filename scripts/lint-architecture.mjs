import { spawnSync } from 'node:child_process';
import process from 'node:process';

/**
 * Le cloisonnement des modules, vérifié — et la vérification, vérifiée.
 *
 * `depcruise` **sort en 0 quand il n'a analysé aucun module**. Ce n'est pas une hypothèse :
 * dependency-cruiser 18 n'accepte pas TypeScript 7, et sans `@swc/core` pour prendre le relais
 * il annonce « 0 modules cruised » avec une coche verte. Le jour où cette dépendance disparaît
 * du graphe — une installation partielle, une plateforme sans binaire natif —, le contrôle
 * d'architecture cesserait de contrôler quoi que ce soit sans que rien ne l'indique.
 *
 * `vitest` et `biome`, eux, échouent quand ils ne trouvent rien à faire. Ce script aligne
 * `depcruise` sur ce comportement.
 */
const MODULES_ATTENDUS_AU_MINIMUM = 100;

const analyse = spawnSync('depcruise', ['src', '--output-type', 'json'], { encoding: 'utf8', shell: false });

if (analyse.error != null) {
  console.error(`depcruise n'a pas pu être exécuté : ${analyse.error.message}`);
  process.exit(1);
}

const { summary } = JSON.parse(analyse.stdout);

if (summary.totalCruised < MODULES_ATTENDUS_AU_MINIMUM) {
  console.error(
    `depcruise n'a analysé que ${summary.totalCruised} modules, là où la bibliothèque en compte plus de ` +
      `${MODULES_ATTENDUS_AU_MINIMUM}. L'analyseur ne lit pas les sources — vérifier que @swc/core est ` +
      `installé et que « parser: 'swc' » figure dans .dependency-cruiser.cjs.`
  );
  process.exit(1);
}

const rapport = spawnSync('depcruise', ['src'], { encoding: 'utf8', shell: false, stdio: 'inherit' });

process.exit(rapport.status ?? 1);
