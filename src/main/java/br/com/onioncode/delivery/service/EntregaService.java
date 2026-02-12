package br.com.onioncode.delivery.service;

import br.com.onioncode.delivery.domain.Diaria;
import br.com.onioncode.delivery.domain.Entrega;
import br.com.onioncode.delivery.domain.Motoboy;
import br.com.onioncode.delivery.dto.diaria.DiariaResponseDTO;
import br.com.onioncode.delivery.dto.entrega.EntregaCreateDTO;
import br.com.onioncode.delivery.dto.entrega.EntregaResponseDTO;
import br.com.onioncode.delivery.repository.DiariaRepository;
import br.com.onioncode.delivery.repository.EntregaRepository;
import br.com.onioncode.delivery.repository.MotoboyRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EntregaService {

    private final EntregaRepository entregaRepository;
    private final MotoboyService motoboyService;
    private final DiariaService diariaService;
    private final DiariaRepository diariaRepository;
    private final MotoboyRepository motoboyRepository;

    public EntregaResponseDTO save(EntregaCreateDTO dto) {
        Motoboy motoboy = motoboyService.findById(dto.getMotoboy_id());
        if (motoboy == null) {
            throw new EntityNotFoundException("Motoboy not found");
        }

        LocalDate now = LocalDate.now();
        Diaria diaria = null;
        diaria = diariaRepository.findByMotoboyAndDate(motoboy, now);

        Entrega entrega;
        entrega = new Entrega(dto.getClientName(), dto.getBairro(), dto.getRua(), dto.getNum(), dto.getPrice());

        if(diaria == null){
            diariaService.save(motoboy.getId());

        }

        diaria = diariaRepository.findByMotoboyAndDate(motoboy, now);

        diaria.getLista().add(entrega);
        entrega.setDiaria(diaria);
        entregaRepository.save(entrega);
        return toResponse(entrega);

        }

        public EntregaResponseDTO toResponse(Entrega entrega) {
            return new EntregaResponseDTO(entrega.getId(), entrega.getClientName(), entrega.getRua(), entrega.getBairro(), entrega.getNum(), entrega.getPrice());
        }
    }
