import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, map, Observable, of, switchMap, tap } from 'rxjs';

export interface Task {
  task: string,
  video_id: string
}

export interface HistoryItem {
  video_name: string,
  task_id: string,
  creation_date: string,
  id: string,
}

export interface ProgressItemResult {
  markdown_response: string
}

export interface ProgressItem {
  task_id: string,
  status: string,
  progress: number,
  progress_message: string,
  result: ProgressItemResult
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'https://humaker.api.areamovil.com.co/v1/task';

  constructor(private http: HttpClient) {}

  uploadVideo(file: File): Observable<Task> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Task>(`${this.apiUrl}/add`, formData);
  }

  getHistory(): Observable<HistoryItem[]> {
    /*
    let md = `# Volentem superbia

## Ulciscitur tamen effugit heros

Lorem markdownum in certa fortius hanc saepe praecipiet carmine laceri illo
ripas num sub deprenderat. Coetus pater et hostia ecce latices parens videre
insonuit. Vaga atque vellem noctem maturus et **mare** cape natisque felicesque
possunt sparsaque **exstinctum concipit**.

    printerBot.bigKilohertzType *= dlc.algorithmHsf(dot - pum, programming,
            click);
    if (menu == perlServerUnit) {
        shift_array = localhost_wais_server.correctionAbendRj(compatible_mtu -
                reciprocal, jfsPretestRadcab, sql);
        gigabyte_bsod_rgb(tweakTrinitronMemory, characterKeyboard,
                gif_ddr_leopard + network);
    } else {
        screenshot_png += 1;
        radcabMail = name_acl_degauss * barSo;
    }
    if (adc(icon_windows_metal) <= 87) {
        newbieIcqBot = gbpsLpi(2 - bsod_fsb_transfer, import_baseband_router);
    } else {
        lpi /= 80;
        digital.shortcut(duplex(array, remoteTime, ssh_software), cmyk_query);
    }
    hacker_nosql_backbone += token.cdn(13, microphone);
    managementRing.url_router_batch(power(cpsOsi, type_dvd_pack, point_leopard)
            * networkingPeopleware);

Serosque conlapsosque risit artem, habes, iunctum gloria iuvat una? Data manu
nigra, munere, in ante, ora locis. Molliter removit loqui fuisset sequitur
turaque, quod nec, videri arsit sumus iunguntur coniunx, sua.

## Non bello suis tibi

Opus tremor mihi: postquam suffusus. Per somni mortis, nec plus Nemeaea centum
viri sed facto. Tot rapta, dum manu et, e credere hominum perque potuisse!

Sua in iura habeo, fallor tibi amare, Theridamas aspera descendit viscera, de
edideras creati favent. Absumitur et dextra Argosque sparsus armo.

Latebris exsultat durat turpiter primum servavit Sicaniam fuit, crescit? Optetis
pervigilem natus boves?

Extis Iunoni! Morte primus in *luridus*! Caede enim naiades recognoscit patrio
repetita dedere qua qua; in miseram, causa discordia valles aethera minimas
scelerata traxit. Quoque nomen nate omne ne, [cruore aevo
miseri](http://autemimoque.net/despectabat) paulatim patrium mulces post venae:
gentibus.
        `;
    let list: VideoItem[] = [
      {
        id: "1",
        name: "Nombre del video 01",
        date: "10/12/2025",
        size: 25103,
        thumbnailUrl: "",
        description: md,
      },
      {
        id: "2",
        name: "Nombre del video 02",
        date: "10/12/2025",
        size: 25103,
        thumbnailUrl: "",
        description: md,
      },
      {
        id: "3",
        name: "Nombre del video 03",
        date: "10/12/2025",
        size: 25103,
        thumbnailUrl: "",
        description: md,
      },
      {
        id: "4",
        name: "Nombre del video 04",
        date: "10/12/2025",
        size: 25103,
        thumbnailUrl: "",
        description: md,
      },
      {
        id: "5",
        name: "Nombre del video 05",
        date: "10/12/2025",
        size: 25103,
        thumbnailUrl: "",
        description: md,
      }
    ];
    let response: VideoHistoryResponse = {
      items: list,
      total: 4
    };
    return of(response);
    */
    return this.http.get<HistoryItem[]>(`${this.apiUrl}/list`);
  }

  getItem(task_id: string): Observable<ProgressItem> {
    return this.http.get<ProgressItem>(`${this.apiUrl}/status/${task_id}`);
  }

}
