package br.com.onioncode.delivery.service;

import br.com.onioncode.delivery.domain.Entrega;
import br.com.onioncode.delivery.domain.ListaDeEntregas;
import br.com.onioncode.delivery.domain.Motoboy;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
@Service
public class ListaDeEntregaService {

    public ListaDeEntregas create(Motoboy motoboyID, LocalDate localDate, Entrega entrega){
        return null;
    }
}
