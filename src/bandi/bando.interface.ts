export interface Bando {
  id: string;
  stato: 'Attivo' | 'In arrivo' | 'Chiuso';
  titolo: string;
  ente: string;
  tags: string[];
  dataChiusura: string; // Es. "21 Aprile 2026"
  dotazioneFinanziaria: string;
  tipoAgevolazione: string;
  territorio: string;
}