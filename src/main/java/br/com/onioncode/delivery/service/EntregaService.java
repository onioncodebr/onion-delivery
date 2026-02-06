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

import br.com.onioncode.delivery.repository.TemporaryRepository;

@Service
public class EntregaService {
    @Autowired
    private ListaDeEntregaService listaDeEntregaService;
    private AtomicLong contador = new AtomicLong(1);

}
