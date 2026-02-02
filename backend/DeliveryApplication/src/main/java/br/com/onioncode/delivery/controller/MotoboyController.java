package br.com.onioncode.delivery.controller;

import br.com.onioncode.delivery.domain.Motoboy;
import br.com.onioncode.delivery.dto.MotoboyCreateDTO;
import br.com.onioncode.delivery.dto.MotoboyUpdateDTO;
import br.com.onioncode.delivery.service.MotoboyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/motoboys")
public class MotoboyController {

    @Autowired
    private MotoboyService mtbs;

    @PostMapping()
    public ResponseEntity<Motoboy> CreateMotoboy(@RequestBody MotoboyCreateDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(mtbs.create(dto));
    }
    @GetMapping
    public List<Motoboy> getAllMotoboys(){
        return mtbs.getAllMotoboys();
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<Motoboy>> getMotoboyByName(@PathVariable String name){
        return ResponseEntity.status(HttpStatus.OK).body(mtbs.getMotoboyByName(name));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Motoboy> update(@PathVariable Long id, @RequestBody MotoboyUpdateDTO dto){
        return ResponseEntity.status(HttpStatus.OK).body(mtbs.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id, @RequestBody MotoboyUpdateDTO dto) {
                return ResponseEntity.status(HttpStatus.OK).body(mtbs.delete(id, dto));
        }
    }