package br.com.onioncode.delivery.service;

import br.com.onioncode.delivery.domain.Diaria;
import br.com.onioncode.delivery.domain.Entrega;
import br.com.onioncode.delivery.domain.Motoboy;
import br.com.onioncode.delivery.dto.diaria.DiariaResponseDTO;
import br.com.onioncode.delivery.dto.entrega.EntregaResponseDTO;
import br.com.onioncode.delivery.repository.DiariaRepository;
import br.com.onioncode.delivery.repository.MotoboyRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiariaService {
    private final MotoboyService motoboyService;
    private final DiariaRepository diariaRepository;
    private final MotoboyRepository motoboyRepository;
    private final EntregaService entregaService;

    public DiariaResponseDTO save(Long id) {
        Motoboy motoboy = motoboyService.findById(id);
        if (motoboy == null) {
            throw new EntityNotFoundException("Motoboy not found");
        }
        LocalDate now = LocalDate.now();
            Diaria diaria = diariaRepository.findByMotoboyAndDate(motoboy, now);
            if(diaria == null) {
                diaria = new Diaria(now, motoboy);
                diariaRepository.save(diaria);
            }
            return toResponse(diaria);
    }
    public Diaria findById(long id) {
        return diariaRepository.findById(id);
    }



    public DiariaResponseDTO findByMotoboyAndDate(Long id, LocalDate date) {
        Motoboy motoboy = motoboyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Motoboy not found"));
        Diaria diaria = null;
        diaria = diariaRepository.findByMotoboyAndDate(motoboy, date);
        if(diaria == null) {
            diaria = diariaRepository.save(new Diaria(LocalDate.now(), motoboy));
        }
        return toResponse(diaria);
    }


    public List<DiariaResponseDTO> getByMotoboy(Long motoboyId) {
        Motoboy motoboy = motoboyService.findById(motoboyId);

        if(motoboy == null){
            throw new EntityNotFoundException("Motoboy not found");
        }

        List<Diaria> diarias = diariaRepository.getDiariasByMotoboy(motoboy);

        List<DiariaResponseDTO> responseList = new ArrayList<>();
        for(Diaria diaria : diarias){
            responseList.add(toResponse(diaria));
        }
        return responseList;
    }


    //ESTAVA REALIZANDO A CONSTRUÇÃO DO METODO GET DIARIA BY MOTOBOY AND DATE POREM PAREI NO PROBLEMA NO FOR DE ENTREGA
    public DiariaResponseDTO toResponse(Diaria diaria) {
        DiariaResponseDTO diariaResponseDTO = new DiariaResponseDTO();
        diariaResponseDTO.setId(diaria.getId());
        diariaResponseDTO.setDate(diaria.getDate());
        List<Entrega> list = diaria.getLista();
        List<EntregaResponseDTO> entregasDTO = new ArrayList<>();

        for (Entrega entrega : diaria.getLista()) {
            entregasDTO.add(entregaService.toResponse(entrega));
        }

        diariaResponseDTO.setListaDeEntregas(entregasDTO);

        diariaResponseDTO.setMotoboyName(diaria.getMotoboy().getName());
        return diariaResponseDTO;
    }
}

