package com.example.brewery.repository;

import com.example.brewery.entity.AppUser;
import com.example.brewery.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    @Query("SELECT f FROM Favorite f WHERE f.user.username = :username")
    List<Favorite> findByUserUsername(@Param("username") String username);

    @Query("DELETE FROM Favorite f WHERE f.user.username = :username AND f.breweryId = :breweryId")
    void deleteByUserUsernameAndBreweryId(@Param("username") String username, @Param("breweryId") String breweryId);

}
