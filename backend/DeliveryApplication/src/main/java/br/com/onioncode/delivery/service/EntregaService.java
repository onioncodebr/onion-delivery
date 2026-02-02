package br.com.onioncode.delivery.service;

import br.com.onioncode.delivery.domain.Entrega;
import br.com.onioncode.delivery.domain.ListaDeEntregas;
import br.com.onioncode.delivery.domain.Motoboy;
import br.com.onioncode.delivery.dto.EntregaCreateDTO;
import br.com.onioncode.delivery.repository.TemporaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class EntregaService {
    @Autowired
    private ListaDeEntregaService listaDeEntregaService;
    private AtomicLong contador = new AtomicLong(1);

    public Entrega create(Long motoboyId, EntregaCreateDTO dto) {
        Entrega entrega = new Entrega(contador.getAndIncrement(), dto.getClientName(), dto.getRua(), dto.getBairro(), dto.getNum(), dto.getKms());
        for(Motoboy motoboy : TemporaryRepository.getMotoboyDataBase()){
            if(motoboy.getId().equals(motoboyId)){
                for(ListaDeEntregas list : motoboy.getListaDeEntregas()){
                    if(list.getDate() == LocalDate.now()){
                        list.getLista().add(entrega);
                    }else {
                        ListaDeEntregas ls = new ListaDeEntregas(contador.getAndIncrement(), LocalDate.now(), motoboy);
                        ls.setLista(new ArrayList<>(List.of(entrega)));
                        motoboy.getListaDeEntregas().add(ls);

                    }
                }
            }
        }
        return entrega;
    }
}
