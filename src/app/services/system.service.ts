import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { System } from '../interfaces/helpers/system';
import { environment } from 'src/environments/environment';
import { SystemResponse } from '../interfaces/helpers/SystemResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private baseUrl = environment.apiBaseUrl + '/system';

  private list : System[] = [
    {
      id: '37d6d81f-b5fd-4407-b0fc-21785f5576f1',
      title: 'Processa faturas atrasadas',
      description: 'Executa uma verificação detalhada para identificar faturas que estão em atraso, permitindo a aplicação de medidas corretivas de forma proativa.',
      route: 'invoice/overdue/processing'
    },
    {
      id: '4474f842-92ee-4e3f-8499-7955f9c87dc4',
      title: 'Processa pagamento de faturas',
      description: 'Realiza uma análise das faturas pendentes e verifica a possibilidade de pagamento automático, utilizando o token de cartão de crédito, caso estejam dentro do prazo estabelecido.',
      route: 'invoice/automated-payment'
    },
    {
      id: '5d4ef3a6-c2b5-4d3e-8b8c-b266935239d4',
      title: 'Usuário de sistema',
      description: 'Executa a atualização das informações do usuário de sistema, garantindo que todos os dados estejam sincronizados e atualizados conforme as mudanças recentes.',
      route: 'user/password'
    },
    {
      id: '5eb26cc5-ff3e-4a97-9c96-698feec9caff',
      title: 'Webhooks de sistema',
      description: 'Realiza a atualização e ativação dos webhooks configurados no sistema, assegurando que as integrações externas estejam funcionando corretamente e recebendo as notificações apropriadas.',
      route: 'webhook/change'
    },
    {
      id: '84d9a874-9c4a-400b-8199-db184b5db82a',
      title: 'Finalização de contratos',
      description: 'Executa uma verificação para identificar contratos que já atingiram o seu término, permitindo o encerramento adequado e a liberação dos recursos associados.',
      route: 'contract/finalization'
    },
    {
      id: '2f1aa2b0-a500-4c53-8a87-53f3d183055d',
      title: 'Cancelamento de rescisões',
      description: 'Verifica a existência de processos de rescisão que foram iniciados mas não concluídos, permitindo a tomada de decisão mais acertada.',
      route: 'contract/cancel/process/termination'
    }
  ];

  constructor(private httpClient: HttpClient) {}

  GetAll() {
    return this.list;
  }

  GetById(id: string) {
    return this.list.find(x => x.id == id);
  }

  RunSystem(route: string): Observable<SystemResponse> {
    return this.httpClient.patch<SystemResponse>(`${this.baseUrl}/${route}`, null);
  }
}
