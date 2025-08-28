export default function loadBalancer(chinaDownload, USDownload) {
  // retourne la valeur de la promesse qui se résout en premier
  return Promise.race([chinaDownload, USDownload]);
}
